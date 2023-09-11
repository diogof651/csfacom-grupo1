package com.example.ledes.aplicacao;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.ledes.dominio.Projeto;
import com.example.ledes.infraestrutura.ProjetoRepositorio;
import com.example.ledes.infraestrutura.dto.ProjetoResponseDTO;


@Service
public class ListagemProjetoServico {

    @Autowired
    private ProjetoRepositorio projetoRepositorio;

    public List<ProjetoResponseDTO> listarProjetos() {
        List<Projeto> projetos = (List<Projeto>) projetoRepositorio.findAll();
        return projetos.stream()
                .map(this::converterParaDTO)
                .collect(Collectors.toList());
    }

    private ProjetoResponseDTO converterParaDTO(Projeto projeto) {
        return new ProjetoResponseDTO(
                projeto.getId(),
                projeto.getNome(),
                projeto.getDescricao(),
                projeto.getInicio(),
                projeto.getTermino(),
                projeto.getStatus(),
                projeto.getTipo(),
                projeto.getAtivo()
        );
    }
}