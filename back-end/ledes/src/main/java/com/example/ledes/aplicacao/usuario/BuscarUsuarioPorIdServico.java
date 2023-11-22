package com.example.ledes.aplicacao.usuario;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.Optional;

import com.example.ledes.dominio.Usuario;
import com.example.ledes.infraestrutura.UsuarioRepositorio;
import com.example.ledes.infraestrutura.dto.UsuarioResponseDTO;

@Service
public class BuscarUsuarioPorIdServico {

    @Autowired
    private UsuarioRepositorio usuarioRepositorio;

    @Transactional(readOnly = true)
    public UsuarioResponseDTO buscarUsuarioPorId(Long id) {
        Optional<Usuario> usuarioOptional = usuarioRepositorio.findById(id);

        if (usuarioOptional.isPresent()) {
            Usuario usuario = usuarioOptional.get();
            return new UsuarioResponseDTO(usuario.getId(), usuario.getNome(), usuario.getEmail(),
                    usuario.isAtivo(), usuario.getFotoPerfil(), usuario.getLinkedin(), usuario.getGithub(),
                    usuario.getPermissoes());
        } else {
            return null;
        }
    }
}
