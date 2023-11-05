package com.example.ledes.aplicacao.tipoprojeto;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.ledes.dominio.TipoProjeto;
import com.example.ledes.infraestrutura.TipoProjetoRepositorio;
import com.example.ledes.infraestrutura.dto.TipoProjetoResponseDTO;

@Service
public class DesativarTipoProjetoServico {
    @Autowired
    private TipoProjetoRepositorio tipoProjetoRepositorio;

    @Transactional
    public TipoProjetoResponseDTO desativar(Long id) {
        TipoProjeto tipoProjeto = tipoProjetoRepositorio.findById(id).orElse(null);

        if (tipoProjeto != null) {

            tipoProjeto.setAtivo(false);
            tipoProjetoRepositorio.save(tipoProjeto);

            return new TipoProjetoResponseDTO(tipoProjeto.getId(), tipoProjeto.getTipo(), tipoProjeto.getAtivo());
        } else {
            return null;
        }
    }
}
