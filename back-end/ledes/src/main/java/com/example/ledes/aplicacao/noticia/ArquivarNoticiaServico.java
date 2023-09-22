package com.example.ledes.aplicacao.noticia;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.ledes.dominio.Noticia;
import com.example.ledes.infraestrutura.NoticiaRepositorio;
import com.example.ledes.infraestrutura.dto.NoticiaRequestDTO;
import com.example.ledes.infraestrutura.dto.NoticiaResponseDTO;

@Service
public class ArquivarNoticiaServico {
    @Autowired
    private NoticiaRepositorio noticiaRepositorio;

    public NoticiaResponseDTO arquivar(Long id, NoticiaRequestDTO noticiaRequest){

        Noticia noticia = noticiaRepositorio.findById(id).orElse(null);

        if(noticia != null){
            noticia.setEstado(noticiaRequest.getEstado());
        
            noticiaRepositorio.save(noticia);

            return new NoticiaResponseDTO(noticia.getId(), noticia.getTitulo(), noticia.getDescricao(), noticia.getAutor(), noticia.getData(),
            noticia.getConteudo(), noticia.getEstado(), noticia.getThumbnail(), noticia.getDataPublicacao(), noticia.getAnexosPdf(), noticia.getEmDestaque());
        } else{
            return null;
        }
    }
}
