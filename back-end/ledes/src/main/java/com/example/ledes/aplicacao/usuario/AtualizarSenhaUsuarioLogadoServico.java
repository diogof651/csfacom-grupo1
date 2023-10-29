package com.example.ledes.aplicacao.usuario;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.ledes.dominio.Usuario;
import com.example.ledes.infraestrutura.UsuarioRepositorio;
import com.example.ledes.infraestrutura.dto.UsuarioLoginResponseDTO;
import com.example.ledes.infraestrutura.dto.UsuarioLoginSenhaRequestDTO;
import com.example.ledes.utils.SenhaUtils;

@Service
public class AtualizarSenhaUsuarioLogadoServico {

    @Autowired
    private UsuarioRepositorio usuarioRepositorio;

    @Transactional
    public UsuarioLoginResponseDTO trocarSenha(UsuarioLoginSenhaRequestDTO usuarioLoginRequestDTO) {
        String resposta = "Informações Incorretas";
        if (validarPadraoSenha(usuarioLoginRequestDTO)) {
            Usuario usuario = usuarioRepositorio.findByCodigoHash(usuarioLoginRequestDTO.getHash());
            if (usuario != null) {
                usuario.setSenha(SenhaUtils.gerarSenhaCriptografada(usuarioLoginRequestDTO.getSenha()));
                usuario.deslogar();
                usuarioRepositorio.save(usuario);
                resposta = "Senha alterada, refaça o login utilizando a nova senha.";
            }
        }
        return new UsuarioLoginResponseDTO(resposta);
    }

    private boolean validarPadraoSenha(UsuarioLoginSenhaRequestDTO usuarioLoginRequestDTO) {
        // A senha deve ter pelo menos 1 letra maiúscula, 1 letra minúscula, 1 dígito
        // numérico e 1 caractere especial, e ter um comprimento total de 10 caracteres
        String padrao = "^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)(?=.*[@!#$%*]).{10,}$";
        Pattern pattern = Pattern.compile(padrao);
        Matcher matcher = pattern.matcher(usuarioLoginRequestDTO.getSenha());
        return matcher.matches();
    }
}