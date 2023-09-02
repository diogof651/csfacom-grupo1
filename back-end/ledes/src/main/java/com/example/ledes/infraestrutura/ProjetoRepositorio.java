package com.example.ledes.infraestrutura;

import org.springframework.data.repository.CrudRepository;

import com.example.ledes.dominio.Projeto;

public interface ProjetoRepositorio extends CrudRepository<Projeto, Long> {
    
}
