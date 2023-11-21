package com.example.ledes.aplicacao.usuario;

import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.ledes.dominio.Usuario;
import com.example.ledes.infraestrutura.UsuarioRepositorio;
import com.example.ledes.infraestrutura.dto.UsuarioGerenciarRequestDTO;
import com.example.ledes.infraestrutura.dto.UsuarioGerenciarResponseDTO;

@Service
public class DesativarUsuarioServicoGerenciar {
    @Autowired
    private UsuarioRepositorio usuarioRepositorio;

    @Transactional
    public UsuarioGerenciarResponseDTO atualizarPerfilUsuarioGerenciar(Long idlLong, UsuarioGerenciarRequestDTO usuarioGerenciarRequestDTO, String hash) {
        Usuario usuario = usuarioRepositorio.findById(idlLong).orElse(null);
        Optional<Usuario> usuarioHash = usuarioRepositorio.findByCodigoHash(hash);
        
        if (usuarioHash.isPresent() && usuario != null) {
            if(usuarioHash.get().possuiPermissao("Admin")){
                usuario.setAtivo(false);  
            }
            usuarioRepositorio.save(usuario);
            return new UsuarioGerenciarResponseDTO(usuario.getId(), usuario.getNome(), usuario.getEmail(),
            usuario.getFotoPerfil(), usuario.getLinkedin(), usuario.getGithub(),usuario.getCodigoUnico());
        } else {
            return null;
        }
    }
}