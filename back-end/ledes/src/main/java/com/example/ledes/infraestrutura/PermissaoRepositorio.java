package com.example.ledes.infraestrutura;

import org.springframework.data.repository.CrudRepository;

import com.example.ledes.dominio.Permissao;

public interface PermissaoRepositorio extends CrudRepository<Permissao, Long> {

    Permissao findByNome(String permissaoNome);
   
}
