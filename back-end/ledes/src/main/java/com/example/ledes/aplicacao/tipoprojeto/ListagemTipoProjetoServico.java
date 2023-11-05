package com.example.ledes.aplicacao.tipoprojeto;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.ledes.dominio.TipoProjeto;
import com.example.ledes.infraestrutura.TipoProjetoRepositorio;
import com.example.ledes.infraestrutura.dto.TipoProjetoResponseDTO;

@Service
public class ListagemTipoProjetoServico {

    @Autowired
    private TipoProjetoRepositorio tipoProjetoRepositorio;

    public List<TipoProjetoResponseDTO> listarTiposProjetos() {
        List<TipoProjeto> tipoProjetos = (List<TipoProjeto>) tipoProjetoRepositorio.findAll();
        return tipoProjetos.stream()
                .map(this::converterParaDTO)
                .collect(Collectors.toList());
    }

    private TipoProjetoResponseDTO converterParaDTO(TipoProjeto tipoProjeto) {
        return new TipoProjetoResponseDTO(
                tipoProjeto.getId(),
                tipoProjeto.getTipo(),
                tipoProjeto.getAtivo());
    }
}