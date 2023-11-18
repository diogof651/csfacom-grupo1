package com.example.ledes.aplicacao.projeto;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.ledes.dominio.Projeto;
import com.example.ledes.dominio.Usuario;
import com.example.ledes.infraestrutura.ProjetoRepositorio;
import com.example.ledes.infraestrutura.UsuarioRepositorio;
import com.example.ledes.infraestrutura.dto.ProjetoRequestDTO;
import com.example.ledes.infraestrutura.dto.ProjetoResponseDTO;

@Service
public class AtualizarProjetoServico {
    @Autowired
    private ProjetoRepositorio projetoRepositorio;
    @Autowired
    private UsuarioRepositorio usuarioRepositorio;

    @Transactional
    public ProjetoResponseDTO atualizar(Long id, ProjetoRequestDTO projetoRequest, String hash) {
        Optional<Usuario> usuario = usuarioRepositorio.findByCodigoHash(hash);

        Projeto projeto = projetoRepositorio.findById(id).orElse(null);

        if (projeto != null && usuario.isPresent()) {
            if (usuario.get().possuiPermissao("ADMIN") || usuario.get().possuiPermissao("EDITORPROJETO")) {
                projeto.setNome(projetoRequest.getNome());
                projeto.setDescricao(projetoRequest.getDescricao());
                projeto.setInicio(projetoRequest.getInicio());
                projeto.setTermino(projetoRequest.getTermino());
                projeto.setStatus(projetoRequest.getStatus());
                projeto.setTipo(projetoRequest.getTipo());
                projetoRepositorio.save(projeto);

                // Retornar o projeto atualizado como ProjetoResponseDTO
                return new ProjetoResponseDTO(projeto.getId(), projeto.getNome(), projeto.getDescricao(),
                        projeto.getInicio(),
                        projeto.getTermino(), projeto.getStatus(), projeto.getTipo(), projeto.getAtivo());
            }
        }

        return null;
    }
}
