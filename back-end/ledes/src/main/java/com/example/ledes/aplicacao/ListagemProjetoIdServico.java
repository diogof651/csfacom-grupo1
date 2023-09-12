package com.example.ledes.aplicacao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.ledes.dominio.Projeto;
import com.example.ledes.infraestrutura.ProjetoRepositorio;
import com.example.ledes.infraestrutura.dto.ProjetoResponseDTO;

@Service
public class ListagemProjetoIdServico {
     @Autowired
    private ProjetoRepositorio projetoRepositorio;

    public ProjetoResponseDTO buscarPorId(Long id) {
        Projeto projeto = projetoRepositorio.findById(id).orElse(null);

        if (projeto != null) {
            return new ProjetoResponseDTO(projeto.getId(), projeto.getNome(),
                    projeto.getDescricao(), projeto.getInicio(), projeto.getTermino(),
                    projeto.getStatus(), projeto.getTipo(), projeto.getAtivo());
        } else {
            return null;
        }
    }
    
}
