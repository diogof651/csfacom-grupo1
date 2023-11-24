package com.example.ledes.aplicacao.usuario;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.ledes.dominio.Usuario;
import com.example.ledes.infraestrutura.UsuarioRepositorio;
import com.example.ledes.infraestrutura.dto.UsuarioGerenciarRequestDTO;
import com.example.ledes.infraestrutura.dto.UsuarioGerenciarResponseDTO;

@Service
public class AtualizarUsuarioServicoGerenciar {

    @Autowired
    private UsuarioRepositorio usuarioRepositorio;

    @Transactional
    public UsuarioGerenciarResponseDTO atualizarPerfilUsuarioGerenciar(Long id,
            UsuarioGerenciarRequestDTO usuarioGerenciarRequestDTO, String hash) {
        Usuario usuario = usuarioRepositorio.findById(id).get();
        Optional<Usuario> usuarioHash = usuarioRepositorio.findByCodigoHash(hash);

        if (usuarioHash.isPresent() && usuario != null) {
            if (usuarioHash.get().possuiPermissao("ADMIN")) {
                usuario.setNome(usuarioGerenciarRequestDTO.getNome());
                usuario.setEmail(usuarioGerenciarRequestDTO.getEmail());
                usuario.setAtivo(usuarioGerenciarRequestDTO.isAtivo());
                usuario.setPermissoes(usuarioGerenciarRequestDTO.getPermissoes());
            }

            usuarioRepositorio.save(usuario);
            return new UsuarioGerenciarResponseDTO(usuario.getId(), usuario.getNome(), usuario.getEmail(),
                    usuario.getFotoPerfil(), usuario.getLinkedin(), usuario.getGithub(),
                    usuario.getCodigoUnico());
        } else {
            return null;
        }
    }
}
