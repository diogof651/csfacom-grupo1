package com.example.ledes.aplicacao.membro;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.ledes.dominio.Membro;
import com.example.ledes.dominio.Projeto;
import com.example.ledes.infraestrutura.MembroRepositorio;
import com.example.ledes.infraestrutura.ProjetoRepositorio;
import com.example.ledes.infraestrutura.dto.MembroResponseDTO;

@Service
public class RemoverMembroProjetoServico {

    @Autowired
    private MembroRepositorio membroRepositorio;
    @Autowired
    private ProjetoRepositorio projetoRepositorio;

    @Transactional
    public MembroResponseDTO desativar(Long membroId, Long projetoId) {
        Membro membro = membroRepositorio.findById(membroId).orElse(null);
        Projeto projeto = projetoRepositorio.findById(projetoId).orElse(null);

        if (membro != null) {
            membro.getProjetos_ativos().remove(projeto);
            membroRepositorio.save(membro);

            return new MembroResponseDTO(membro.getId(), membro.getUsuario(), membro.getUsuario().getNome(), 
            membro.getUsuario().getEmail(),membro.getTipoVinculo(), membro.getTipoPapel(),
            membro.getDataIngresso(), membro.getDataTermino(), membro.isAtivo());
        } else {
            return null;
        }
    }
}
