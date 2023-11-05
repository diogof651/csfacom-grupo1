package com.example.ledes.infraestrutura;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;


import com.example.ledes.dominio.TipoProjeto;

public interface TipoProjetoRepositorio extends CrudRepository<TipoProjeto, Long> {

    TipoProjeto findByTipo(String tipo);

    @Query("SELECT t FROM TipoProjeto t WHERE t.ativo = true")
    List<TipoProjeto> findByAtivo();


}
