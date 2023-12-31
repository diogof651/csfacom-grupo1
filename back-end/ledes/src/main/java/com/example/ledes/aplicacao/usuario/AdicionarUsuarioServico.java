package com.example.ledes.aplicacao.usuario;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.ledes.dominio.Usuario;
import com.example.ledes.infraestrutura.UsuarioRepositorio;
import com.example.ledes.infraestrutura.dto.UsuarioDTO;
import com.example.ledes.infraestrutura.dto.UsuarioResponseDTO;
import com.example.ledes.utils.CodigoUnicoUtils;

@Service
public class AdicionarUsuarioServico {
    @Autowired
    private UsuarioRepositorio usuarioRepositorio;

    public UsuarioResponseDTO adicionar(UsuarioDTO usuarioRequest) {
        String codigoUnico = CodigoUnicoUtils.gerarCodigo(usuarioRepositorio);
        // adicionar verificação se o email já existe na base de dados

        Usuario usuario = new Usuario(usuarioRequest.getNome(), usuarioRequest.getEmail(), codigoUnico);
        usuarioRepositorio.save(usuario);
        return new UsuarioResponseDTO(usuario.getId(), usuario.getNome(), usuario.getEmail(),
                usuario.isAtivo(), usuario.getFotoPerfil(), usuario.getLinkedin(), usuario.getGithub());
    }
}
