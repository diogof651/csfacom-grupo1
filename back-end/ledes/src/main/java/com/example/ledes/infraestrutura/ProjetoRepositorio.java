package com.example.ledes.infraestrutura;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import com.example.ledes.dominio.Projeto;

public interface ProjetoRepositorio extends CrudRepository<Projeto, Long> {
    

        @Query("SELECT p FROM Projeto p WHERE "
        + "(:tipo IS NULL OR p.tipo = :tipo) AND "
        + "(:ativo IS NULL OR p.ativo = :ativo) AND "
        + "(:nome IS NULL OR p.nome = :nome)")
        List<Projeto> buscarProjetosPorParametros(
                @Param("tipo") String tipo,
                @Param("ativo") Boolean ativo,
                @Param("nome") String nome);

}
