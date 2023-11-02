package com.example.ledes.aplicacao.usuario;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.ledes.dominio.Usuario;
import com.example.ledes.infraestrutura.UsuarioRepositorio;
import com.example.ledes.infraestrutura.dto.PerfilUsuarioRequestDTO;
import com.example.ledes.infraestrutura.dto.UsuarioResponseDTO;

@Service
public class AtualizarUsuarioPorHashServico {

    @Autowired
    private UsuarioRepositorio usuarioRepositorio;

    @Transactional
    public UsuarioResponseDTO atualizarUsuarioPorHash(String hash, PerfilUsuarioRequestDTO usuarioRequestDTO) {
        Usuario usuario = usuarioRepositorio.findByCodigoHash(hash).orElse(null);

        if (usuario != null) {
            usuario.setNome(usuarioRequestDTO.getNome());
            usuario.setEmail(usuarioRequestDTO.getEmail());
            // usuario.setAtivo(usuarioRequestDTO.isAtivo());
            usuario.setFotoPerfil(usuarioRequestDTO.getFoto());
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
