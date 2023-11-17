package com.example.ledes.aplicacao.tipopapel;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.ledes.dominio.TipoPapel;
import com.example.ledes.infraestrutura.TipoPapelRepositorio;
import com.example.ledes.infraestrutura.dto.TipoPapelResponseDTO;

@Service
public class BuscarTipoPapelIdServico {
    @Autowired
    private TipoPapelRepositorio tipoPapelRepositorio;

    public TipoPapelResponseDTO buscarPorId(Long id) {
        TipoPapel tipoPapel = tipoPapelRepositorio.findById(id).orElse(null);

        if (tipoPapel != null) {
            return new TipoPapelResponseDTO(tipoPapel.getId(), tipoPapel.getNome(), tipoPapel.getAtivo());
        } else {
            return null;
        }
    }
}
