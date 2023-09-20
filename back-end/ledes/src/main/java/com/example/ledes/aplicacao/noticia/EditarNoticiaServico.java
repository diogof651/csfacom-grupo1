package com.example.ledes.aplicacao.noticia;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.ledes.dominio.Noticia;
import com.example.ledes.infraestrutura.NoticiaRepositorio;
import com.example.ledes.infraestrutura.dto.NoticiaRequestDTO;
import com.example.ledes.infraestrutura.dto.NoticiaResponseDTO;

@Service
public class EditarNoticiaServico {
    @Autowired
    private NoticiaRepositorio noticiaRepositorio;

    public NoticiaResponseDTO editar(Long id, NoticiaRequestDTO noticiaRequest){

        Noticia noticia = noticiaRepositorio.findById(id).orElse(null);

        if(noticia != null){
            noticia.setTitulo(noticiaRequest.getTitulo());
            noticia.setDescricao(noticiaRequest.getDescricao());
            noticia.setAutor(noticiaRequest.getAutor());
            noticia.setData(noticiaRequest.getData());
            noticia.setEstado(noticiaRequest.getEstado());
            noticia.setThumbnail(noticiaRequest.getThumbnail());
            noticia.setDataPublicacao(noticiaRequest.getDataPublicacao());
            noticia.setAnexosPdf(noticiaRequest.getAnexos());

            noticiaRepositorio.save(noticia);

            return new NoticiaResponseDTO(noticia.getId(), noticia.getTitulo(), noticia.getDescricao(), noticia.getAutor(), noticia.getData(),
            noticia.getEstado(), noticia.getThumbnail(), noticia.getDataPublicacao(), noticia.getAnexosPdf());
        } else{
            return null;
        }
    }
}
