package com.example.ledes.aplicacao.tipoprojeto;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.ledes.dominio.TipoProjeto;
import com.example.ledes.infraestrutura.TipoProjetoRepositorio;
import com.example.ledes.infraestrutura.dto.TipoProjetoResponseDTO;

@Service
public class BuscarTipoProjetoIdServico {
    @Autowired
    private TipoProjetoRepositorio tipoProjetoRepositorio;

    public TipoProjetoResponseDTO buscarPorId(Long id) {
        TipoProjeto tipoProjeto = tipoProjetoRepositorio.findById(id).orElse(null);

        if (tipoProjeto != null) {
            return new TipoProjetoResponseDTO(tipoProjeto.getId(), tipoProjeto.getNome(), tipoProjeto.getAtivo());
        } else {
            return null;
        }
    }
}
