package com.example.ledes.aplicacao.tipoprojeto;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.ledes.dominio.TipoProjeto;
import com.example.ledes.infraestrutura.TipoProjetoRepositorio;
import com.example.ledes.infraestrutura.dto.TipoProjetoResponseDTO;

@Service
public class AtivarTipoProjetoServico {
    @Autowired
    private TipoProjetoRepositorio tipoProjetoRepositorio;

    @Transactional
    public TipoProjetoResponseDTO ativar(Long id) {
        TipoProjeto tipoProjeto = tipoProjetoRepositorio.findById(id).orElse(null);

        if (tipoProjeto != null) {

            tipoProjeto.setAtivo(true);
            tipoProjetoRepositorio.save(tipoProjeto);

            return new TipoProjetoResponseDTO(tipoProjeto.getId(), tipoProjeto.getNome(), tipoProjeto.getAtivo());
        } else {
            return null;
        }
    }
}
