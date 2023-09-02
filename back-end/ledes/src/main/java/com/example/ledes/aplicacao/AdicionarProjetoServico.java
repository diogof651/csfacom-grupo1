package com.example.ledes.aplicacao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.ledes.dominio.Projeto;
import com.example.ledes.infraestrutura.ProjetoRepositorio;

@Service
public class AdicionarProjetoServico {
    @Autowired
    private ProjetoRepositorio projetoRepositorio;

    public ProjetoResponseDTO adicionar(ProjetoRequestDTO projetoRequest){
        Projeto projeto = new Projeto(projetoRequest.getNome());
        projetoRepositorio.save(projeto);
        return new ProjetoResponseDTO(projeto.getNome());
    }
}
