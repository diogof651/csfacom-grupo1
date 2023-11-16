package com.example.ledes.aplicacao.tipopapel;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.ledes.dominio.TipoPapel;
import com.example.ledes.infraestrutura.TipoPapelRepositorio;
import com.example.ledes.infraestrutura.dto.TipoPapelResponseDTO;

@Service
public class AtivarTipoPapelServico {
    @Autowired
    private TipoPapelRepositorio tipoPapelRepositorio;

    @Transactional
    public TipoPapelResponseDTO ativar(Long id) {
        TipoPapel tipoPapel = tipoPapelRepositorio.findById(id).orElse(null);

        if (tipoPapel != null) {

            tipoPapel.setAtivo(true);
            tipoPapelRepositorio.save(tipoPapel);

            return new TipoPapelResponseDTO(tipoPapel.getId(), tipoPapel.getTipo(), tipoPapel.getAtivo());
        } else {
            return null;
        }
    }
}
