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
        String resposta = "Projeto com o mesmo tipo encontrado e desativado.";
        TipoProjeto tipoProjeto = tipoProjetoRepositorio.findByNome(tipoprojetoRequest.getNome());
        if (tipoProjeto != null) {
            if (tipoProjeto.getAtivo() == false) {
                return new TipoProjetoResponseDTO(resposta);
            }
        } else {
            tipoProjeto = new TipoProjeto(tipoprojetoRequest.getNome());
            tipoProjeto.setAtivo(true);
            tipoProjetoRepositorio.save(tipoProjeto);
        }
        return new TipoProjetoResponseDTO(tipoProjeto.getId(), tipoProjeto.getNome(), tipoProjeto.getAtivo());
    }
}
