package com.example.ledes.aplicacao.usuario;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.ledes.dominio.Usuario;
import com.example.ledes.infraestrutura.UsuarioRepositorio;
import com.example.ledes.infraestrutura.dto.UsuarioLoginResponseDTO;
import com.example.ledes.utils.SenhaUtils;

@Service
public class ValidarEmailESenhaServico {
    private final UsuarioRepositorio usuarioRepositorio;

    @Autowired
    public ValidarEmailESenhaServico(UsuarioRepositorio usuarioRepositorio) {
        this.usuarioRepositorio = usuarioRepositorio;

    }

    public UsuarioLoginResponseDTO autenticar(String email, String senha) {
        // encontrar por email o usuario
        Usuario usuario = usuarioRepositorio.findByEmail(email);
        String resposta = "Informações Incorretas";
        if (usuario != null) {
            if (SenhaUtils.verificarSenha(senha, usuario.getSenha())) {
                usuario.logar();
                usuarioRepositorio.save(usuario);
                resposta = usuario.getCodigoHash();
            }
        }
        return new UsuarioLoginResponseDTO(resposta);
    }
}
