package com.example.ledes.infraestrutura;

import org.springframework.data.repository.CrudRepository;

import com.example.ledes.dominio.Membro;

public interface MembroRepositorio extends CrudRepository<Membro, Long>  {

    Membro findByEmail(String email);
    
}