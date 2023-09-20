package com.example.ledes.aplicacao.noticia;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.ledes.dominio.Noticia;
import com.example.ledes.infraestrutura.NoticiaRepositorio;
import com.example.ledes.infraestrutura.dto.NoticiaRequestDTO;
import com.example.ledes.infraestrutura.dto.NoticiaResponseDTO;

@Service
public class AdicionarNoticiaServico {
    @Autowired
    private NoticiaRepositorio noticiaRepositorio;

    public NoticiaResponseDTO adicionar(NoticiaRequestDTO noticiaRequest) {
        Noticia noticia = new Noticia(noticiaRequest.getTitulo(), noticiaRequest.getDescricao(), noticiaRequest.getAutor(), noticiaRequest.getData(), noticiaRequest.getEstado(),
        null, null, null);
        noticiaRepositorio.save(noticia);        
        return new NoticiaResponseDTO(noticia.getId(), noticia.getTitulo(), noticia.getDescricao(), noticia.getAutor(), noticia.getData(),
         noticia.getEstado(), noticia.getThumbnail(), noticia.getDataPublicacao(), noticia.getAnexosPdf());
    }
}
