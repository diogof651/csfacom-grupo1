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
    public UsuarioResponseDTO ativar(Long id) {
        Usuario usuario = usuarioRepositorio.findById(id).orElse(null);

        if (usuario != null) {
            if (!usuario.isAtivo()) {
                usuario.setAtivo(true);
                usuarioRepositorio.save(usuario);

                return new UsuarioResponseDTO(usuario.getId(),
                        usuario.getNome(),
                        usuario.getEmail(),
                        usuario.isAtivo(),
                        usuario.getFotoPerfil(),
                        usuario.getLinkedin(), usuario.getGithub());
            } else {
                return null;
            }
        } else {
            return null;
        }
    }
}