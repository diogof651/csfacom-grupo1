package com.example.ledes.aplicacao.tipopapel;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.ledes.dominio.TipoPapel;
import com.example.ledes.infraestrutura.TipoPapelRepositorio;
import com.example.ledes.infraestrutura.dto.TipoPapelResponseDTO;

@Service
public class ListagemTipoPapelServico {

    @Autowired
    private TipoPapelRepositorio tipoPapelRepositorio;

    public List<TipoPapelResponseDTO> listarTiposPapeis() {
        List<TipoPapel> tipoPapeis = (List<TipoPapel>) tipoPapelRepositorio.findAll();
        return tipoPapeis.stream()
                .map(this::converterParaDTO)
                .collect(Collectors.toList());
    }

    private TipoPapelResponseDTO converterParaDTO(TipoPapel tipoPapel) {
        return new TipoPapelResponseDTO(
                tipoPapel.getId(),
                tipoPapel.getTipo(),
                tipoPapel.getAtivo());
    }
}