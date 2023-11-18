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
        TipoPapel tipoPapel = tipoPapelRepositorio.findByNome(tipoPapelRequest.getNome());
        if (tipoPapel != null) {
            if (tipoPapel.getAtivo() == false) {
                return new TipoPapelResponseDTO(resposta);
            }
        } else {
            tipoPapel = new TipoPapel(tipoPapelRequest.getNome());
            tipoPapel.setAtivo(true);
            tipoPapelRepositorio.save(tipoPapel);
        }
        return new TipoPapelResponseDTO(tipoPapel.getId(), tipoPapel.getNome(), tipoPapel.getAtivo());
    }
}
