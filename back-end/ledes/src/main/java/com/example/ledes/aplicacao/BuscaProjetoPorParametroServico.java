package com.example.ledes.aplicacao;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.ledes.dominio.Projeto;
import com.example.ledes.infraestrutura.ProjetoRepositorio;
import com.example.ledes.infraestrutura.dto.ProjetoResponseDTO;
import java.util.stream.Stream;

@Service
public class BuscaProjetoPorParametroServico  {

    @Autowired
    private ProjetoRepositorio projetoRepositorio;

    public List<ProjetoResponseDTO> buscarProjetosPorParametros(String tipo, String status, String nome) {
        List<Projeto> projetos = (List<Projeto>) projetoRepositorio.buscarProjetosPorParametros(tipo, status, nome);
        
        Stream<Projeto> projetoStream = projetos.stream();

        List<ProjetoResponseDTO> projetosFiltrados = projetoStream
                .map(this::converterParaDTO)
                .collect(Collectors.toList());

        return projetosFiltrados;

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