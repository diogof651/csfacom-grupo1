package com.example.ledes.aplicacao.tipoprojeto;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.ledes.dominio.TipoProjeto;
import com.example.ledes.infraestrutura.TipoProjetoRepositorio;
import com.example.ledes.infraestrutura.dto.TipoProjetoRequestDTO;
import com.example.ledes.infraestrutura.dto.TipoProjetoResponseDTO;

@Service
public class AdicionarTipoProjetoServico {
    @Autowired
    private TipoProjetoRepositorio tipoProjetoRepositorio;

    public TipoProjetoResponseDTO adicionar(TipoProjetoRequestDTO tipoprojetoRequest) {
        
        TipoProjeto tipoprojeto = tipoProjetoRepositorio.findByTipo(tipoprojetoRequest.getTipo());
        if(tipoprojeto != null){
            if(tipoprojeto.getAtivo() == false){
                throw new IllegalArgumentException("Projeto com o mesmo tipo encontrado e desativado.");
            }
        }
        else{
            tipoprojeto = new TipoProjeto(tipoprojetoRequest.getTipo().toUpperCase());
            tipoProjetoRepositorio.save(tipoprojeto);
        }
        return new TipoProjetoResponseDTO(tipoprojeto.getId(), tipoprojeto.getTipo(), tipoprojeto.getAtivo());
    }
}
