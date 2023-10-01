package com.example.ledes.aplicacao.noticia;

import java.util.ArrayList;
import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.ledes.dominio.Anexo;
import com.example.ledes.dominio.Noticia;
import com.example.ledes.infraestrutura.AnexoRepositorio;
import com.example.ledes.infraestrutura.NoticiaRepositorio;
import com.example.ledes.infraestrutura.dto.AnexoDTO;
import com.example.ledes.infraestrutura.dto.NoticiaResponseDTO;

@Service
public class DesarquivarNoticiaServico {
    @Autowired
    private NoticiaRepositorio noticiaRepositorio;

    @Autowired
    private AnexoRepositorio anexoRepositorio;

    public NoticiaResponseDTO desarquivar(Long id) {

        Noticia noticia = noticiaRepositorio.findById(id).orElse(null);

        if (noticia != null) {
            noticia.desarquivar();
            noticiaRepositorio.save(noticia);

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
}
