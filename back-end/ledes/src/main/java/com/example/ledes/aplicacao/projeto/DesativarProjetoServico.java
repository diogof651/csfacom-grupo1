package com.example.ledes.aplicacao.projeto;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.ledes.dominio.Projeto;
import com.example.ledes.infraestrutura.ProjetoRepositorio;
import com.example.ledes.infraestrutura.dto.ProjetoRequestDTO;
import com.example.ledes.infraestrutura.dto.ProjetoResponseDTO;

@Service
public class DesativarProjetoServico {
    @Autowired
    private ProjetoRepositorio projetoRepositorio;

    @Transactional
    public ProjetoResponseDTO desativar(Long id, ProjetoRequestDTO projetoRequest) {
        Projeto projeto = projetoRepositorio.findById(id).orElse(null);

        if (projeto != null) {

            projeto.setAtivo(false);
            projetoRepositorio.save(projeto);

            return new ProjetoResponseDTO(projeto.getId(), projeto.getNome(), projeto.getDescricao(),
                    projeto.getInicio(),
                    projeto.getTermino(), projeto.getStatus(), projeto.getTipo(), projeto.getAtivo());
        } else {
            return null;
        }
    }
}
