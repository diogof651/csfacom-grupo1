package com.example.ledes.aplicacao.projeto;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.example.ledes.dominio.Projeto;
import com.example.ledes.infraestrutura.ProjetoRepositorio;
import com.example.ledes.infraestrutura.dto.ProjetoResponseDTO;

@Service
public class ListagemProjetoIdServico {
    @Autowired
    private ProjetoRepositorio projetoRepositorio;
    

    public ProjetoResponseDTO buscarPorId(Long id) {
        Projeto projeto = projetoRepositorio.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND,
                                                "Projeto não encontrado"));

        return new ProjetoResponseDTO(
                        projeto.getId(),
                        projeto.getNome(),
                        projeto.getDescricao(),
                        projeto.getInicio(),
                        projeto.getTermino(),
                        projeto.getStatus(),
                        projeto.getTipoProjeto(),
                        projeto.getAtivo());
    }

}
