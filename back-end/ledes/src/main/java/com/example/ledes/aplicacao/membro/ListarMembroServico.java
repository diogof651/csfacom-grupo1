package com.example.ledes.aplicacao.membro;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.ledes.infraestrutura.dto.MembroResponseDTO;
import com.example.ledes.dominio.Membro;
import com.example.ledes.infraestrutura.MembroRepositorio;
import com.example.ledes.infraestrutura.dto.MembroRequestDTO;


import java.util.List;
import java.util.stream.Collectors;

@Service
public class ListarMembroServico {
    @Autowired
    private MembroRepositorio membroRepositorio;

    public List<MembroResponseDTO> obterListaMembros(boolean ativos) {
        List<Membro> membros = ativos ? membroRepositorio.findByAtivoTrue() : membroRepositorio.findByAtivoFalse();

        return membros.stream()
                .map(this::mapToResponseDTO)
                .collect(Collectors.toList());
    }

    public MembroResponseDTO criarMembro(MembroRequestDTO membroRequestDTO) {
        Membro membro = mapToEntity(membroRequestDTO);
        Membro savedMembro = membroRepositorio.save(membro);
        return mapToResponseDTO(savedMembro);
    }

    

    private Membro mapToEntity(MembroRequestDTO membroRequestDTO) {
        Membro membro = new Membro();
        membro.setNome(membroRequestDTO.getNome());
        membro.setFoto(membroRequestDTO.getFoto());
        // Mapear outros campos...
        return membro;
    }

    private MembroResponseDTO mapToResponseDTO(Membro membro) {
        MembroResponseDTO responseDTO = new MembroResponseDTO(null, null, null, null, null, null, false);
        responseDTO.setNome(membro.getNome());
        responseDTO.setFoto(membro.getFoto());
        // Mapear outros campos...
        return responseDTO;
    }
}
