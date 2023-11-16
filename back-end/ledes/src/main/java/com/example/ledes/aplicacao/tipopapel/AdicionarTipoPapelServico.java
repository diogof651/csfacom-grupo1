package com.example.ledes.aplicacao.tipopapel;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.ledes.dominio.TipoPapel;
import com.example.ledes.infraestrutura.TipoPapelRepositorio;
import com.example.ledes.infraestrutura.dto.TipoPapelRequestDTO;
import com.example.ledes.infraestrutura.dto.TipoPapelResponseDTO;

@Service
public class AdicionarTipoPapelServico {
    @Autowired
    private TipoPapelRepositorio tipoPapelRepositorio;

    public TipoPapelResponseDTO adicionar(TipoPapelRequestDTO tipoPapelRequest) {
        String resposta = "Papel com o mesmo nome encontrado e desativado.";
        TipoPapel tipopapel = tipoPapelRepositorio.findByTipo(tipoPapelRequest.getTipo());
        if(tipopapel != null){
            if(tipopapel.getAtivo() == false){
                return new TipoPapelResponseDTO(resposta);
            }
        }
        else{
            tipopapel = new TipoPapel(tipoPapelRequest.getTipo().toUpperCase());
            tipopapel.setAtivo(true);
            tipoPapelRepositorio.save(tipopapel);
        }
        return new TipoPapelResponseDTO(tipopapel.getId(), tipopapel.getTipo(), tipopapel.getAtivo());
    }
}
