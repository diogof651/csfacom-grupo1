package com.example.ledes.aplicacao.projeto;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.ledes.dominio.Projeto;
import com.example.ledes.infraestrutura.ProjetoRepositorio;
import com.example.ledes.infraestrutura.dto.ProjetoRequestDTO;
import com.example.ledes.infraestrutura.dto.ProjetoResponseDTO;

@Service
public class AdicionarProjetoServico {
    @Autowired
    private ProjetoRepositorio projetoRepositorio;

    public ProjetoResponseDTO adicionar(ProjetoRequestDTO projetoRequest) {
        Projeto projeto = new Projeto(projetoRequest.getNome(), projetoRequest.getDescricao(),
                projetoRequest.getInicio(), projetoRequest.getTermino(), projetoRequest.getStatus(),
                projetoRequest.getTipoProjeto());
        projetoRepositorio.save(projeto);
        return new ProjetoResponseDTO(projeto.getId(), projeto.getNome(), projeto.getDescricao(), projeto.getInicio(),
                projeto.getTermino(), projeto.getStatus(), projeto.getTipoProjeto(), projeto.getAtivo());
    }
}
