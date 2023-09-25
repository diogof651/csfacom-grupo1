package com.example.ledes.aplicacao.membro;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.ledes.dominio.Membro;
import com.example.ledes.infraestrutura.MembroRepositorio;
import com.example.ledes.infraestrutura.dto.MembroResponseDTO;

@Service
public class DesativarMembroServico {

    @Autowired
    private MembroRepositorio membroRepositorio;

    @Transactional
    public MembroResponseDTO desativar(Long id) {
        Membro membro = membroRepositorio.findById(id).orElse(null);

        if (membro != null) {

            membro.setAtivo(false);
            membroRepositorio.save(membro);

            return new MembroResponseDTO(membro.getNome(), membro.getEmail(), membro.getTipoVinculo(), membro.getTipoPapel(),
            membro.getDataIngresso(), membro.getDataTermino(), membro.isAtivo());
        } else {
            return null;
        }
    }
}
