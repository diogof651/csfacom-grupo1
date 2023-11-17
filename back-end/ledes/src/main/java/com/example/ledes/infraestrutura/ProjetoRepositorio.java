package com.example.ledes.infraestrutura;

import java.util.Collection;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import com.example.ledes.dominio.Projeto;

public interface ProjetoRepositorio extends CrudRepository<Projeto, Long> {
        @Query("SELECT p FROM Projeto p WHERE "
                        + "(:tipo IS NULL OR p.tipoProjeto.tipo = :tipo OR :tipo = '') AND "
                        + "(:status IS NULL OR p.status = :status OR :status = '') AND "
                        + "(:nome IS NULL OR p.nome LIKE CONCAT('%', :nome, '%') OR :nome = '') AND "
                        + "p.ativo = true ORDER BY p.nome")
        Collection<Projeto> buscarProjetosPorParametros(
                        @Param("tipo") String tipo,
                        @Param("status") String status,
                        @Param("nome") String nome);
}
