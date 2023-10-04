package com.example.ledes.infraestrutura;

import java.util.Date;
import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.example.ledes.dominio.Noticia;
import com.example.ledes.dominio.Usuario;

@Repository
public interface NoticiaRepositorio extends CrudRepository<Noticia, Long> {

        List<Noticia> findByTituloContaining(String titulo);

        List<Noticia> findByEstadoAndDataPublicacaoLessThanEqual(String string, Date dataAtual);

        List<Noticia> findByEmDestaqueTrue();

        List<Noticia> findByEstado(String string);

        List<Noticia> findByDataPublicacao(Date dataPublicacao);

        List<Noticia> findByAutor(Usuario usuario);

        List<Noticia> findByEstadoAndDataPublicacaoGreaterThan(String string, Date dataAtual);
}