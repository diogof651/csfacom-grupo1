package com.example.ledes.aplicacao.usuario;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.ledes.dominio.Usuario;
import com.example.ledes.infraestrutura.UsuarioRepositorio;
import com.example.ledes.infraestrutura.dto.UsuarioResponseDTO;

@Service
public class DesativarUsuarioServico {

    @Autowired
    private UsuarioRepositorio usuarioRepositorio;

    @Transactional
    public UsuarioResponseDTO desativar(Long id, String hash) {

        Usuario usuarioHash = usuarioRepositorio.findByCodigoHash(hash).get();

        if (usuarioHash.possuiPermissao("ADMIN")) {

            Usuario usuario = usuarioRepositorio.findById(id).orElse(null);

            if (usuario != null) {
                usuario.setAtivo(false);
                usuarioRepositorio.save(usuario);

                return new UsuarioResponseDTO(usuario.getId(),
                        usuario.getNome(),
                        usuario.getEmail(),
                        usuario.isAtivo(),
                        usuario.getFotoPerfil(),
                        usuario.getLinkedin(), usuario.getGithub(), usuario.getPermissoes());
            }
        }

        return null;
    }
}