package com.example.ledes.infraestrutura;

import org.springframework.data.repository.CrudRepository;

import com.example.ledes.dominio.Usuario;

public interface UsuarioRepositorio extends CrudRepository<Usuario, Long>  {
    
}
