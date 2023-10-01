package com.example.ledes.aplicacao.usuario;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.ledes.dominio.Usuario;
import com.example.ledes.infraestrutura.UsuarioRepositorio;
import com.example.ledes.infraestrutura.dto.UsuarioRequestDTO;
import com.example.ledes.infraestrutura.dto.UsuarioResponseDTO;

@Service
public class AtualizarUsuarioServico {

    @Autowired
    private UsuarioRepositorio usuarioRepositorio;

    @Transactional
    public UsuarioResponseDTO atualizarUsuario(Long id, UsuarioRequestDTO usuarioRequestDTO) {
        Usuario usuario = usuarioRepositorio.findById(id).orElse(null);

        if (usuario != null) {
            usuario.setNome(usuarioRequestDTO.getNome());
            usuario.setEmail(usuarioRequestDTO.getEmail());
            usuario.setAtivo(usuarioRequestDTO.isAtivo());
            usuario.setFotoPerfil(usuarioRequestDTO.getFotoPerfil());
            usuario.setGithub(usuarioRequestDTO.getGithub());
            usuario.setLinkedin(usuarioRequestDTO.getLinkedin());

            usuarioRepositorio.save(usuario);
            return new UsuarioResponseDTO(usuario.getId(), usuario.getNome(), usuario.getEmail(),
                    usuario.isAtivo(), usuario.getFotoPerfil(), usuario.getLinkedin(), usuario.getGithub());
        } else {
            return null;
        }
    }
}