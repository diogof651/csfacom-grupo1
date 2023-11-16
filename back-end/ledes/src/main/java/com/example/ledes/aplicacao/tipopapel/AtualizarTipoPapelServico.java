package com.example.ledes.aplicacao.tipopapel;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.ledes.dominio.TipoPapel;
import com.example.ledes.infraestrutura.TipoPapelRepositorio;
import com.example.ledes.infraestrutura.dto.TipoPapelRequestDTO;
import com.example.ledes.infraestrutura.dto.TipoPapelResponseDTO;

@Service
public class AtualizarTipoPapelServico {
    @Autowired
    private TipoPapelRepositorio tipoPapelRepositorio;

    @Transactional
    public TipoPapelResponseDTO atualizar(Long id, TipoPapelRequestDTO tipoPapelRequest) {
        // Verificar se o papel com o ID especificado existe
        TipoPapel tipopapel = tipoPapelRepositorio.findById(id).orElse(null);

        if (tipopapel != null) {
            tipopapel.setTipo(tipoPapelRequest.getTipo().toUpperCase());
            tipoPapelRepositorio.save(tipopapel);

            // Retornar o tipo papel atualizado como TipoPapelResponseDTO
            return new TipoPapelResponseDTO(tipopapel.getId(), tipopapel.getTipo(), tipopapel.getAtivo());
        } else {
            return null;
        }
    }
}
