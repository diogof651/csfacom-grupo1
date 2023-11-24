package com.example.ledes.aplicacao.usuario;

import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.ledes.dominio.Permissao;
import com.example.ledes.dominio.Usuario;
import com.example.ledes.infraestrutura.UsuarioRepositorio;

@Service
public class ObterPermissoesUsuarioLogado {
    @Autowired
    private UsuarioRepositorio usuarioRepositorio;

    public Set<Permissao> obterPermissoesUsuarioLogado(String hash) {
        Optional<Usuario> usuario = usuarioRepositorio.findByCodigoHash(hash);
        if (usuario.isPresent()) {
            return usuario.get().getPermissoes();
        } else {
            return null;
        }
    }

}
