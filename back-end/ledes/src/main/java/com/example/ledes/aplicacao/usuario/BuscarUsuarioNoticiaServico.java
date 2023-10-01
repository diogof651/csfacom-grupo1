package com.example.ledes.aplicacao.usuario;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.ledes.dominio.Usuario;
import com.example.ledes.infraestrutura.UsuarioRepositorio;
import com.example.ledes.infraestrutura.dto.UsuarioResponseDTO;

@Service
public class BuscarUsuarioNoticiaServico {
    @Autowired
    private UsuarioRepositorio usuarioRepositorio;

    public List<UsuarioResponseDTO> buscarUsuariosNoticia() {        
        List<Usuario> usuarios = (List<Usuario>) usuarioRepositorio.encontrarAutoresDeNoticias();
        return usuarios.stream()
                .map(this::converterParaDTO)
                .collect(Collectors.toList());

    }

    private UsuarioResponseDTO converterParaDTO(Usuario usuario) {
        return new UsuarioResponseDTO(
                usuario.getId(),
                usuario.getNome(),
                usuario.getEmail(),
                usuario.isAtivo(),
                usuario.getFotoPerfil(),
                usuario.getLinkedin(),
                usuario.getGithub()
        );
    }
}
