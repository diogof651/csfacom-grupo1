package com.example.ledes.aplicacao.usuario;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.ledes.dominio.Usuario;
import com.example.ledes.infraestrutura.UsuarioRepositorio;
import com.example.ledes.infraestrutura.dto.UsuarioDTO;
import com.example.ledes.infraestrutura.dto.UsuarioGerenciarRequestDTO;
import com.example.ledes.infraestrutura.dto.UsuarioResponseDTO;
import com.example.ledes.utils.CodigoUnicoUtils;

@Service
public class AdicionarUsuarioServico {
    @Autowired
    private UsuarioRepositorio usuarioRepositorio;

    public UsuarioResponseDTO adicionar(UsuarioGerenciarRequestDTO usuarioRequest, String hash) {
        String resposta = "Usuário sem permissão para criação de outro usuário.";
        Optional<Usuario> usuarioHash = usuarioRepositorio.findByCodigoHash(hash);
        Usuario usuarioEmail = usuarioRepositorio.findByEmail(usuarioRequest.getEmail());

        if (usuarioHash.isPresent() && usuarioEmail == null) {
            if (usuarioHash.get().possuiPermissao("ADMIN")) {
                String codigoUnico = CodigoUnicoUtils.gerarCodigo(usuarioRepositorio);
                // adicionar verificação se o email já existe na base de dados
                Usuario usuario = new Usuario(usuarioRequest.getNome(), usuarioRequest.getEmail(), codigoUnico,
                        usuarioRequest.getPermissoes());
                usuarioRepositorio.save(usuario);
                return new UsuarioResponseDTO(usuario.getId(), usuario.getNome(), usuario.getEmail(),
                        usuario.isAtivo(), usuario.getFotoPerfil(), usuario.getLinkedin(), usuario.getGithub());
            }
        }
        return new UsuarioResponseDTO(resposta);
    }

    public UsuarioResponseDTO adicionarPeloMembro(UsuarioDTO usuarioRequest, String hash) {
        String resposta = "Usuário sem permissão para criação de outro usuário.";
        Optional<Usuario> usuarioHash = usuarioRepositorio.findByCodigoHash(hash);
        String codigoUnico = CodigoUnicoUtils.gerarCodigo(usuarioRepositorio);
        // adicionar verificação se o email já existe na base de dados
        Usuario usuarioEmail = usuarioRepositorio.findByEmail(usuarioRequest.getEmail());

        if (usuarioHash.isPresent() && usuarioEmail == null) {
            if (usuarioHash.get().possuiPermissao("ADMIN") || usuarioHash.get().possuiPermissao("EDITORPROJETO")) {
                Usuario usuario = new Usuario(usuarioRequest.getNome(), usuarioRequest.getEmail(), codigoUnico);
                usuarioRepositorio.save(usuario);
                return new UsuarioResponseDTO(usuario.getId(), usuario.getNome(), usuario.getEmail(),
                        usuario.isAtivo(), usuario.getFotoPerfil(), usuario.getLinkedin(), usuario.getGithub());
            }
        }
        return new UsuarioResponseDTO(resposta);
    }

}
