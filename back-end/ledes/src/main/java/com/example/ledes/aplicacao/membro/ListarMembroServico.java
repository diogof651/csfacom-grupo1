package com.example.ledes.aplicacao.membro;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.ledes.dominio.Membro;
import com.example.ledes.infraestrutura.MembroRepositorio;
import com.example.ledes.infraestrutura.dto.MembroResponseDTO;

@Service
public class ListarMembroServico {
    @Autowired
    private MembroRepositorio membroRepositorio;

    public List<MembroResponseDTO> obterListaMembros(Long idProjeto, boolean ativo) {
        List<Membro> membros = membroRepositorio.findByProjetoIdAndAtivo(idProjeto, ativo);

        return membros.stream()
                .map(this::mapToResponseDTO)
                .collect(Collectors.toList());
    }

    private MembroResponseDTO mapToResponseDTO(Membro membro) {
        return new MembroResponseDTO(membro.getId(), membro.getUsuario(), membro.getProjeto(), membro.getDataIngresso(),
                membro.getDataTermino(), membro.isAtivo());
    }
}
