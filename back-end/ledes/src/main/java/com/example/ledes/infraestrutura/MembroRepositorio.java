package com.example.ledes.infraestrutura;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.example.ledes.dominio.Membro;

public interface MembroRepositorio extends CrudRepository<Membro, Long> {
    List<Membro> findByProjetoIdAndAtivo(Long projetoId, boolean ativo);
}
