package com.example.ledes.aplicacao.noticia;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.example.ledes.dominio.Noticia;
import com.example.ledes.infraestrutura.NoticiaRepositorio;
import com.example.ledes.infraestrutura.dto.NoticiaResponseDTO;

@Service
public class ObterNoticiaPorIdServico {

    @Autowired
    private NoticiaRepositorio noticiaRepositorio;

    public NoticiaResponseDTO obterNoticiaPorId(Long id) {
        Noticia noticia = noticiaRepositorio.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Notícia não encontrada"));

        return new NoticiaResponseDTO(
                noticia.getId(),
                noticia.getTitulo(),
                noticia.getAutor(),
                noticia.getConteudo(),
                noticia.getEstado(),
                noticia.getThumbnail(),
                noticia.getDataPublicacao(),
                noticia.getEmDestaque()
                , null);
    }
}
