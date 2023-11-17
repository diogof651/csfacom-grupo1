package com.example.ledes.aplicacao.tipovinculo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.ledes.dominio.TipoVinculo;
import com.example.ledes.infraestrutura.TipoVinculoRepositorio;
import com.example.ledes.infraestrutura.dto.TipoVinculoRequestDTO;
import com.example.ledes.infraestrutura.dto.TipoVinculoResponseDTO;

@Service
public class AtualizarTipoVinculoServico {
    @Autowired
    private TipoVinculoRepositorio tipoVinculoRepositorio;

    @Transactional
    public TipoVinculoResponseDTO atualizar(Long id, TipoVinculoRequestDTO tipoVinculoRequest) {
        // Verificar se o nome do Vinculo com o ID especificado existe
        TipoVinculo tipovinculo = tipoVinculoRepositorio.findById(id).orElse(null);

        if (tipovinculo != null) {
            tipovinculo.setNome(tipoVinculoRequest.getNome().toUpperCase());
            tipoVinculoRepositorio.save(tipovinculo);

            // Retornar o tipo do vinculo atualizado como TipoVinculoResponseDTO
            return new TipoVinculoResponseDTO(tipovinculo.getId(), tipovinculo.getNome(), tipovinculo.getAtivo());
        } else {
            return null;
        }
    }
}