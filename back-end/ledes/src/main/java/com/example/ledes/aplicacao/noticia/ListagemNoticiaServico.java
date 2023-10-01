package com.example.ledes.aplicacao.noticia;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.ledes.dominio.Noticia;
import com.example.ledes.dominio.Usuario;
import com.example.ledes.infraestrutura.NoticiaRepositorio;
import com.example.ledes.infraestrutura.dto.NoticiaListagemResponseDTO;

@Service
public class ListagemNoticiaServico {

    @Autowired
    private NoticiaRepositorio noticiaRepositorio;

    public List<NoticiaListagemResponseDTO> buscarNoticiasPorParametros(String titulo,
            Usuario usuario, Date dataPublicacao, String estado) {

        List<Noticia> noticias = (List<Noticia>) noticiaRepositorio.buscarNoticiasPorParametros(titulo, usuario, estado);
        

        Stream<Noticia> noticiaStream = noticias.stream();

        List<NoticiaListagemResponseDTO> noticiasFiltradas = noticiaStream
                .map(this::converterParaDTO)
                .collect(Collectors.toList());

        return noticiasFiltradas;

    }

    private NoticiaListagemResponseDTO converterParaDTO(Noticia noticia) {
        return new NoticiaListagemResponseDTO(
                noticia.getId(),
                noticia.getTitulo(),
                noticia.getAutor(),
                noticia.getEstado(),
                noticia.getThumbnail(),
                noticia.getDataPublicacao(),
                noticia.getEmDestaque());
    }

}
