package com.example.ledes.aplicacao.projeto;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.ledes.dominio.Projeto;
import com.example.ledes.dominio.Usuario;
import com.example.ledes.infraestrutura.ProjetoRepositorio;
import com.example.ledes.infraestrutura.UsuarioRepositorio;
import com.example.ledes.infraestrutura.dto.ProjetoResponseDTO;

@Service
public class ListagemProjetoIdServico {
    @Autowired
    private ProjetoRepositorio projetoRepositorio;
    @Autowired
    private UsuarioRepositorio usuarioRepositorio;

    public ProjetoResponseDTO buscarPorId(Long id, String hash) {
        Projeto projeto = projetoRepositorio.findById(id).orElse(null);
        Optional<Usuario> usuarioOptional = usuarioRepositorio.findByCodigoHash(hash);

        if (projeto != null && usuarioOptional.isPresent()) {
            Usuario usuario = usuarioOptional.get();
            if (usuario.possuiPermissao("ADMIN") || usuario.possuiPermissao("EDITORPROJETO")) {
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

        return null;
    }

}
