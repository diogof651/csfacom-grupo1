package com.example.ledes.aplicacao.tipovinculo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.ledes.dominio.TipoVinculo;
import com.example.ledes.infraestrutura.TipoVinculoRepositorio;
import com.example.ledes.infraestrutura.dto.TipoVinculoResponseDTO;

@Service
public class AtivarTipoVinculoServico {
    @Autowired
    private TipoVinculoRepositorio tipoVinculoRepositorio;

    @Transactional
    public TipoVinculoResponseDTO ativar(Long id) {
        TipoVinculo tipoVinculo = tipoVinculoRepositorio.findById(id).orElse(null);

        if (tipoVinculo != null) {

            tipoVinculo.setAtivo(true);
            tipoVinculoRepositorio.save(tipoVinculo);

            return new TipoVinculoResponseDTO(tipoVinculo.getId(), tipoVinculo.getNome(), tipoVinculo.getAtivo());
        } else {
            return null;
        }
    }
}