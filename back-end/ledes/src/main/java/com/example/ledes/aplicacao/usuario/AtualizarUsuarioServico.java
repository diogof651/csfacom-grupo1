package com.example.ledes.aplicacao.usuario;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.ledes.dominio.Usuario;
import com.example.ledes.infraestrutura.UsuarioRepositorio;
import com.example.ledes.infraestrutura.dto.PerfilUsuarioRequestDTO;
import com.example.ledes.infraestrutura.dto.UsuarioResponseDTO;

@Service
public class AtualizarUsuarioServico {

    @Autowired
    private UsuarioRepositorio usuarioRepositorio;

    @Transactional
    public UsuarioResponseDTO atualizarPerfilUsuario(String codigoUnico, PerfilUsuarioRequestDTO usuarioRequestDTO) {
        Usuario usuario = usuarioRepositorio.findByCodigoUnico(codigoUnico);

        if (usuario != null) {
            usuario.setFotoPerfil(usuarioRequestDTO.getFoto());
            usuario.setNome(usuarioRequestDTO.getNome());
            usuario.setEmail(usuarioRequestDTO.getEmail());
            usuario.setGithub(usuarioRequestDTO.getGithub());
            usuario.setLinkedin(usuarioRequestDTO.getLinkedin());

            usuarioRepositorio.save(usuario);
            return new UsuarioResponseDTO(usuario.getId(), usuario.getNome(), usuario.getEmail(),
                    usuario.getFotoPerfil(), usuario.getLinkedin(), usuario.getGithub(),
                    usuario.getCodigoUnico());
        } else {
            return null;
        }
    }
}
