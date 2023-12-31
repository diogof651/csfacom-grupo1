package com.example.ledes.aplicacao.projeto;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.ledes.dominio.Projeto;
import com.example.ledes.dominio.TipoProjeto;
import com.example.ledes.infraestrutura.ProjetoRepositorio;
import com.example.ledes.infraestrutura.TipoProjetoRepositorio;
import com.example.ledes.infraestrutura.dto.ProjetoRequestDTO;
import com.example.ledes.infraestrutura.dto.ProjetoResponseDTO;

@Service
public class AtualizarProjetoServico {
    @Autowired
    private ProjetoRepositorio projetoRepositorio;

    @Autowired
    private TipoProjetoRepositorio tipoProjetoRepositorio;

    @Transactional
    public ProjetoResponseDTO atualizar(Long id, ProjetoRequestDTO projetoRequest) {
        // Verificar se o projeto com o ID especificado existe
        Projeto projeto = projetoRepositorio.findById(id).orElse(null);
        TipoProjeto tipoProjeto = tipoProjetoRepositorio.findByNome(projetoRequest.getTipoProjeto());

        if (projeto != null) {
            projeto.setNome(projetoRequest.getNome());
            projeto.setDescricao(projetoRequest.getDescricao());
            projeto.setInicio(projetoRequest.getInicio());
            projeto.setTermino(projetoRequest.getTermino());
            projeto.setStatus(projetoRequest.getStatus());
            projeto.setTipoProjeto(tipoProjeto);
            projetoRepositorio.save(projeto);

            // Retornar o projeto atualizado como ProjetoResponseDTO
            return new ProjetoResponseDTO(projeto.getId(), projeto.getNome(), projeto.getDescricao(),
                    projeto.getInicio(),
                    projeto.getTermino(), projeto.getStatus(), projeto.getTipoProjeto(), projeto.getAtivo());
        } else {
            return null;
        }
    }
}
