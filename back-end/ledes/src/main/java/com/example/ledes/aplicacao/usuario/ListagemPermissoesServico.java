package com.example.ledes.aplicacao.usuario;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.ledes.dominio.Permissao;
import com.example.ledes.infraestrutura.PermissaoRepositorio;
import com.example.ledes.infraestrutura.dto.PermissaoResponseDTO;

@Service
public class ListagemPermissoesServico {

    @Autowired
    private PermissaoRepositorio permissaoRepositorio;

    public List<PermissaoResponseDTO> listarPermissoes() {
        List<Permissao> permissoes = (List<Permissao>) permissaoRepositorio.findAll();
        return permissoes.stream()
                .map(this::converterParaDTO)
                .collect(Collectors.toList());
    }

    private PermissaoResponseDTO converterParaDTO(Permissao permissao) {
        return new PermissaoResponseDTO(permissao.getId(),
                permissao.getNome());
    }

}