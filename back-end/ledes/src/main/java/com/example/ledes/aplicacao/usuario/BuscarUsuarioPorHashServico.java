package com.example.ledes.aplicacao.usuario;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.Optional;

import com.example.ledes.dominio.Usuario;
import com.example.ledes.infraestrutura.UsuarioRepositorio;
import com.example.ledes.infraestrutura.dto.UsuarioResponseDTO;

@Service
public class BuscarUsuarioPorHashServico {

    @Autowired
    private UsuarioRepositorio usuarioRepositorio;

    @Transactional(readOnly = true)
    public UsuarioResponseDTO buscarUsuarioPorHash(String hash) {
        Optional<Usuario> usuarioOptional = usuarioRepositorio.findByCodigoHash(hash);

        if (usuarioOptional.isPresent()) {
            Usuario usuario = usuarioOptional.get();
            return new UsuarioResponseDTO(usuario.getId(), usuario.getNome(), usuario.getEmail(),
                    usuario.getFotoPerfil(), usuario.getLinkedin(), usuario.getGithub(),
                    usuario.getCodigoUnico());
        } else {
            return null;
        }
    }
}
