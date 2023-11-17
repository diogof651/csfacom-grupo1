package com.example.ledes.aplicacao.tipovinculo;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.ledes.dominio.TipoVinculo;
import com.example.ledes.infraestrutura.TipoVinculoRepositorio;
import com.example.ledes.infraestrutura.dto.TipoVinculoResponseDTO;

@Service
public class ListagemTipoVinculoServico {

    @Autowired
    private TipoVinculoRepositorio tipoVinculoRepositorio;

    public List<TipoVinculoResponseDTO> listarTiposVinculos() {
        List<TipoVinculo> tipoVinculos = (List<TipoVinculo>) tipoVinculoRepositorio.findAll();
        return tipoVinculos.stream()
                .map(this::converterParaDTO)
                .collect(Collectors.toList());
    }

    private TipoVinculoResponseDTO converterParaDTO(TipoVinculo tipoVinculo) {
        return new TipoVinculoResponseDTO(
                tipoVinculo.getId(),
                tipoVinculo.getNome(),
                tipoVinculo.getAtivo());
    }
}