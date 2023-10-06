package com.example.ledes.aplicacao.noticia;

import java.util.ArrayList;
import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.ledes.dominio.Anexo;
import com.example.ledes.dominio.Noticia;
import com.example.ledes.infraestrutura.AnexoRepositorio;
import com.example.ledes.infraestrutura.NoticiaRepositorio;
import com.example.ledes.infraestrutura.UsuarioRepositorio;
import com.example.ledes.infraestrutura.dto.AnexoDTO;
import com.example.ledes.infraestrutura.dto.NoticiaRequestDTO;
import com.example.ledes.infraestrutura.dto.NoticiaResponseDTO;

@Service
public class EditarNoticiaServico {
    @Autowired
    private NoticiaRepositorio noticiaRepositorio;

    @Autowired
    private AnexoRepositorio anexoRepositorio;

    @Autowired
    private UsuarioRepositorio usuarioRepositorio;

    public NoticiaResponseDTO editar(Long id, NoticiaRequestDTO noticiaRequest) {

        Noticia noticia = noticiaRepositorio.findById(id).orElse(null);

        if (noticia != null) {
            noticia.definirDataDePublicacao(noticiaRequest.getEstado(), noticiaRequest.getDataPublicacao());
            noticia.setTitulo(noticiaRequest.getTitulo());
            noticia.setConteudo(noticiaRequest.getConteudo());
            noticia.setEstado(noticiaRequest.getEstado());
            noticia.setThumbnail(noticiaRequest.getThumbnail());
            noticia.setEmDestaque(noticiaRequest.getEmDestaque());
            noticiaRepositorio.save(noticia);

            if (!noticiaRequest.getAnexos().isEmpty() || noticiaRequest.getAnexos() != null) {
                vincularAnexos(noticia, noticiaRequest.getAnexos());
            }

            Collection<Anexo> anexosVinculados = anexoRepositorio.findByNoticia(noticia);
            Collection<AnexoDTO> anexosDto = new ArrayList<AnexoDTO>();
            for (Anexo anexo : anexosVinculados) {
                anexosDto.add(new AnexoDTO(anexo.getId(), anexo.getTitulo(), anexo.getConteudo()));
            }

            return new NoticiaResponseDTO(noticia.getId(), noticia.getTitulo(),
                    noticia.getAutor(),
                    noticia.getConteudo(), noticia.getEstado(), noticia.getThumbnail(), noticia.getDataPublicacao(),
                    noticia.getEmDestaque(), anexosDto);
        } else {
            return null;
        }
    }

    @Transactional
    private void vincularAnexos(Noticia noticia, Collection<AnexoDTO> anexos) {
        Collection<Long> ids = new ArrayList<>();
        Collection<Anexo> anexosVinculados = anexoRepositorio.findByNoticia(noticia);

        for (AnexoDTO anexoDTO : anexos) {
            Anexo anexo = null;

            if (anexoDTO.getId() != null) {
                anexo = anexoRepositorio.findById(anexoDTO.getId()).orElse(null);
            }

            if (anexo == null) {
                anexo = new Anexo(anexoDTO.getTitulo(), anexoDTO.getConteudo(), noticia);
            } else {
                anexo.setTitulo(anexoDTO.getTitulo());
                anexo.setConteudo(anexoDTO.getConteudo());
                ids.add(anexoDTO.getId());
            }

            anexoRepositorio.save(anexo);
        }

        // Remover anexos que não estão mais vinculados
        anexosVinculados.forEach(anexoVinculado -> {
            if (!ids.contains(anexoVinculado.getId())) {
                anexoRepositorio.delete(anexoVinculado);
            }
        });
    }

}