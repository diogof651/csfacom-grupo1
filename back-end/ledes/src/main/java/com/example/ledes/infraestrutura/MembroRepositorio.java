package com.example.ledes.infraestrutura;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.example.ledes.dominio.Membro;
@Repository
public interface MembroRepositorio extends CrudRepository<Membro, Long> {
    List<Membro> findByProjetoIdAndAtivo(Long projetoId, boolean ativo);
}
