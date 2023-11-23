package com.example.ledes.aplicacao.usuario;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.ledes.dominio.Usuario;
import com.example.ledes.infraestrutura.UsuarioRepositorio;
import com.example.ledes.infraestrutura.dto.UsuarioGerenciarResponseDTO;

@Service
public class BuscaUsuarioPorFiltroServicoGerenciar {
    @Autowired
    private UsuarioRepositorio usuarioRepositorio;

    public List<UsuarioGerenciarResponseDTO> buscarUsuarioPorFiltro(String nome, String permissao) {
        List<Usuario> usuarios = (List<Usuario>) usuarioRepositorio.buscarUsuarioPorFiltro(nome, permissao);

        Stream<Usuario> usuarioStream = usuarios.stream();

        List<UsuarioGerenciarResponseDTO> usuarioFiltrado = usuarioStream.map(this::converterParaDTO)
                .collect(Collectors.toList());

        return usuarioFiltrado;
    }

    private UsuarioGerenciarResponseDTO converterParaDTO(Usuario usuario) {
        return new UsuarioGerenciarResponseDTO(
                usuario.getId(),
                usuario.getNome(),
                usuario.getFotoPerfil(),
                usuario.isAtivo(),
                usuario.getPermissoes());

    }
}
