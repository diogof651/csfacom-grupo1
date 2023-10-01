package com.example.ledes.infraestrutura;


import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import com.example.ledes.dominio.Usuario;

public interface UsuarioRepositorio extends CrudRepository<Usuario, Long>  {

    @Query("SELECT DISTINCT n.autor FROM Noticia n")
    List<Usuario> encontrarAutoresDeNoticias();

}