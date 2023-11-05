package com.example.ledes.aplicacao.tipoprojeto;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.ledes.dominio.TipoProjeto;
import com.example.ledes.infraestrutura.TipoProjetoRepositorio;
import com.example.ledes.infraestrutura.dto.TipoProjetoRequestDTO;
import com.example.ledes.infraestrutura.dto.TipoProjetoResponseDTO;

@Service
public class AtualizarTipoProjetoServico {
    @Autowired
    private TipoProjetoRepositorio tipoprojetoRepositorio;

    @Transactional
    public TipoProjetoResponseDTO atualizar(Long id, TipoProjetoRequestDTO tipoProjetoRequest) {
        // Verificar se o tipo do projeto com o ID especificado existe
        TipoProjeto tipoprojeto = tipoprojetoRepositorio.findById(id).orElse(null);

        if (tipoprojeto != null) {
            tipoprojeto.setTipo(tipoProjetoRequest.getTipo().toUpperCase());
            tipoprojetoRepositorio.save(tipoprojeto);

            // Retornar o tipo projeto atualizado como TipoProjetoResponseDTO
            return new TipoProjetoResponseDTO(tipoprojeto.getId(), tipoprojeto.getTipo(), tipoprojeto.getAtivo());
        } else {
            return null;
        }
    }
}
