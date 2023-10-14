package com.example.ledes.aplicacao.membro;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.example.ledes.dominio.Membro;
import com.example.ledes.infraestrutura.MembroRepositorio;
import com.example.ledes.infraestrutura.dto.MembroResponseDTO;

@Service
public class ObterMembroPorIdServico {
    @Autowired
    private MembroRepositorio membroRepositorio;

    public MembroResponseDTO obterMembroPorId(Long id) {
        Membro membro = membroRepositorio.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Membro não encontrado"));

        return new MembroResponseDTO(membro.getId(), membro.getUsuario(), membro.getProjeto(), membro.getDataIngresso(),
                membro.getDataTermino(), membro.isAtivo());
    }
}
