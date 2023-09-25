package com.example.ledes.infraestrutura;

import com.example.ledes.dominio.Membro;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface MembroRepositorio extends JpaRepository<Membro, Long> {
    List<Membro> findByAtivoTrue();

    List<Membro> findByAtivoFalse();
}
