package com.example.ledes.aplicacao.noticia;

import java.util.ArrayList;
import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.ledes.dominio.Anexo;
import com.example.ledes.dominio.Noticia;
import com.example.ledes.dominio.Usuario;
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
        Usuario autor = usuarioRepositorio.findById(noticiaRequest.getAutor_id()).get();

        if (noticia != null) {
            noticia.definirDataDePublicacao(noticiaRequest.getEstado(), noticiaRequest.getDataPublicacao());
            noticia.setTitulo(noticiaRequest.getTitulo());
            noticia.setAutor(autor);
            noticia.setConteudo(noticiaRequest.getConteudo());
            noticia.setEstado(noticiaRequest.getEstado());
            noticia.setThumbnail(noticiaRequest.getThumbnail());
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

    private void vincularAnexos(Noticia noticia, Collection<AnexoDTO> anexos) {
        Collection<Long> ids = new ArrayList<Long>();
        Anexo anexo;
        for (AnexoDTO anexoDTO : anexos) {
            if (anexoDTO.getId() == null) {
                anexo = new Anexo(anexoDTO.getTitulo(), anexoDTO.getConteudo(), noticia);
            } else {
                anexo = anexoRepositorio.findById(anexoDTO.getId()).get();
                anexo.setTitulo(anexoDTO.getTitulo());
                anexo.setConteudo(anexoDTO.getConteudo());
                ids.add(anexoDTO.getId());
            }
            anexoRepositorio.save(anexo);
        }

        Collection<Anexo> anexosVinculados = anexoRepositorio.findByNoticia(noticia);
        for (Anexo anexoVinculado : anexosVinculados) {
            if (!ids.contains(anexoVinculado.getId())) {
                anexoRepositorio.delete(anexoVinculado);
            }
        }
    }
}