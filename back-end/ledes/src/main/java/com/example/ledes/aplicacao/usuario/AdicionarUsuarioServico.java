package com.example.ledes.aplicacao.usuario;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.ledes.dominio.Usuario;

import com.example.ledes.infraestrutura.dto.UsuarioRequestDTO;
import com.example.ledes.infraestrutura.dto.UsuarioResponseDTO;
import com.example.ledes.infraestrutura.UsuarioRepositorio;


@Service
public class AdicionarUsuarioServico {
    @Autowired
    private UsuarioRepositorio usuarioRepositorio;

    public UsuarioResponseDTO adicionar(UsuarioRequestDTO usuarioRequest) {
        Usuario usuario = new Usuario(usuarioRequest.getNome(), usuarioRequest.getEmail(), null, usuarioRequest.isAtivo(), null, null);
        usuarioRepositorio.save(usuario);        
        return new UsuarioResponseDTO(usuario.getId(), usuario.getNome(), usuario.getEmail(), usuario.getSenha() , usuario.isAtivo(),usuario.getFotoPerfil(),usuario.getLink());
    }
}
