package com.example.ledes.infraestrutura;
import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;


import com.example.ledes.dominio.TipoVinculo;

public interface TipoVinculoRepositorio extends CrudRepository<TipoVinculo, Long> {

    TipoVinculo findByNome(String nome);

    @Query("SELECT t FROM TipoVinculo t WHERE t.ativo = true")
    List<TipoVinculo> findByAtivo();

}