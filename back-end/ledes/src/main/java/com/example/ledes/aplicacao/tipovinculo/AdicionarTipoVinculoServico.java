package com.example.ledes.aplicacao.tipovinculo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.ledes.dominio.TipoVinculo;
import com.example.ledes.infraestrutura.TipoVinculoRepositorio;
import com.example.ledes.infraestrutura.dto.TipoVinculoRequestDTO;
import com.example.ledes.infraestrutura.dto.TipoVinculoResponseDTO;

@Service
public class AdicionarTipoVinculoServico {
    @Autowired
    private TipoVinculoRepositorio tipoVinculoRepositorio;

    public TipoVinculoResponseDTO adicionar(TipoVinculoRequestDTO tipovinculoRequest) {

        TipoVinculo tipovinculo = tipoVinculoRepositorio.findByNome(tipovinculoRequest.getNome());
        if(tipovinculo != null){
            if(tipovinculo.getAtivo() == false){
                throw new IllegalArgumentException("Vinculo com o mesmo nome encontrado e desativado.");
            }
        }
        else{
            tipovinculo = new TipoVinculo(tipovinculoRequest.getNome().toUpperCase());
            tipovinculo.setAtivo(true);
            tipoVinculoRepositorio.save(tipovinculo);
        }
        return new TipoVinculoResponseDTO(tipovinculo.getId(), tipovinculo.getNome(), tipovinculo.getAtivo());
    }
}