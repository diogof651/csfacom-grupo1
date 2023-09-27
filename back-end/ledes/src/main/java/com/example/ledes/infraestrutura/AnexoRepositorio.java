package com.example.ledes.infraestrutura;

import java.util.Collection;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.example.ledes.dominio.Anexo;
import com.example.ledes.dominio.Noticia;

@Repository
public interface AnexoRepositorio extends CrudRepository<Anexo, Long>{
    @Query("SELECT a FROM Anexo a WHERE a.noticia = :noticia")
    Collection<Anexo> findByNoticia(Noticia noticia);
}
