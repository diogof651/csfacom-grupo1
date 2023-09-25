package com.example.ledes.aplicacao.membro;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.ledes.dominio.Membro;
import com.example.ledes.infraestrutura.MembroRepositorio;
import com.example.ledes.infraestrutura.dto.MembroDTO;
import com.example.ledes.infraestrutura.dto.MembroResponseDTO;

@Service
public class CadastrarMembroServico {

    @Autowired
    public MembroRepositorio membroRepositorio;

    public MembroResponseDTO adicionar(MembroDTO membroRequest) {
        // adicionar verificação se o email já existe na base de dados

        Membro membroExistente = membroRepositorio.findByEmail(membroRequest.getEmail());
            if (membroExistente != null) {
                return new MembroResponseDTO(membroExistente.getNome(), 
                membroExistente.getEmail(), membroExistente.getTipoVinculo(),
                membroExistente.getTipoPapel(), membroExistente.getDataIngresso(), 
                membroExistente.getDataTermino(), membroExistente.isAtivo());         
            } else {
                Membro membro = new Membro(membroRequest.getNome(), membroRequest.getEmail());
                membroRepositorio.save(membro);
                return new MembroResponseDTO(membro.getNome(), membro.getEmail(), membro.getTipoVinculo(), membro.getTipoPapel(),
                membro.getDataIngresso(), membro.getDataTermino(), membro.isAtivo());
            }  
        }
    }


    

