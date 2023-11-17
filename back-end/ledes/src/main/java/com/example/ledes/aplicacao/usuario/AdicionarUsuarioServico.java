package com.example.ledes.aplicacao.usuario;

import java.util.Optional;

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

    public UsuarioResponseDTO adicionar(UsuarioDTO usuarioRequest, String hash) {
        Optional<Usuario> usuarioHash = usuarioRepositorio.findByCodigoHash(hash);
        String codigoUnico = CodigoUnicoUtils.gerarCodigo(usuarioRepositorio);
        // adicionar verificação se o email já existe na base de dados
        Usuario usuarioEmail = usuarioRepositorio.findByEmail(usuarioRequest.getEmail());
    
        if(usuarioHash.isPresent() && usuarioEmail == null){
            if(usuarioHash.get().possuiPermissao("Admin")){
                Usuario usuario = new Usuario(usuarioRequest.getNome(), usuarioRequest.getEmail(), codigoUnico);
                usuarioRepositorio.save(usuario);
                return new UsuarioResponseDTO(usuario.getId(), usuario.getNome(), usuario.getEmail(),
                usuario.isAtivo(), usuario.getFotoPerfil(), usuario.getLinkedin(), usuario.getGithub());
            }
        }
        return null;
    }

    public UsuarioResponseDTO adicionarPeloMembro(UsuarioDTO usuarioRequest, String hash) {
        Optional<Usuario> usuarioHash = usuarioRepositorio.findByCodigoHash(hash);
        String codigoUnico = CodigoUnicoUtils.gerarCodigo(usuarioRepositorio);
        // adicionar verificação se o email já existe na base de dados
        Usuario usuarioEmail = usuarioRepositorio.findByEmail(usuarioRequest.getEmail());
    
        if(usuarioHash.isPresent() && usuarioEmail == null){
            if(usuarioHash.get().possuiPermissao("Admin") || usuarioHash.get().possuiPermissao("Editor")){
                Usuario usuario = new Usuario(usuarioRequest.getNome(), usuarioRequest.getEmail(), codigoUnico);
                usuarioRepositorio.save(usuario);
                return new UsuarioResponseDTO(usuario.getId(), usuario.getNome(), usuario.getEmail(),
                usuario.isAtivo(), usuario.getFotoPerfil(), usuario.getLinkedin(), usuario.getGithub());
            }
        }
        return null;
    }

}
