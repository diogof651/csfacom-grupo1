package com.example.ledes.infraestrutura;

import com.example.ledes.dominio.Noticia;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NoticiaRepositorio extends CrudRepository<Noticia, Long> {
    
}