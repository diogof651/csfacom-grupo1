package com.example.ledes.aplicacao.membro;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.ledes.dominio.Membro;
import com.example.ledes.dominio.TipoPapel;
import com.example.ledes.dominio.TipoVinculo;
import com.example.ledes.infraestrutura.MembroRepositorio;
import com.example.ledes.infraestrutura.dto.MembroRequestDTO;
import com.example.ledes.infraestrutura.dto.MembroResponseDTO;

@Service
public class AtualizarMembroServico {

    @Autowired
    private MembroRepositorio membroRepositorio;

    @Transactional
    public MembroResponseDTO atualizarMembro(Long id, MembroRequestDTO membroRequestDTO) {
        Membro membro = membroRepositorio.findById(id).orElse(null);

        if (membro != null) {
            membro.setTipoVinculo(TipoVinculo.toEnum(membroRequestDTO.getTipoPapel()));
            membro.setTipoPapel(TipoPapel.toEnum(membroRequestDTO.getTipoPapel())); 
            membro.setDataIngresso(membroRequestDTO.getDataIngresso());
            membro.setDataTermino(membroRequestDTO.getDataTermino());
            membroRepositorio.save(membro);

            return new MembroResponseDTO(membro.getId(), membro.getUsuario(), membro.getUsuario().getNome(), 
            membro.getUsuario().getEmail(), membro.getTipoVinculo(), membro.getTipoPapel(),
            membro.getDataIngresso(), membro.getDataTermino(), membro.isAtivo());
            
        } else {
            return null;
        }
    }
}