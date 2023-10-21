package com.example.ledes.aplicacao.usuario;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.ledes.dominio.Usuario;
import com.example.ledes.infraestrutura.UsuarioRepositorio;
import com.example.ledes.infraestrutura.dto.UsuarioLoginResponseDTO;

@Service
public class ValidarEmailECodigoUnicoServico {
    @Autowired
    private UsuarioRepositorio usuarioRepositorio;

    public UsuarioLoginResponseDTO verificar(String email, String codigoUnico) {
        Usuario usuario = usuarioRepositorio.findByEmail(email);
        String resposta = "Informações Incorretas";
        if (usuario != null) {
            if (usuario.getCodigoUnico().equals(codigoUnico)) {
                resposta = "Informações corretas";
            }
        }
        return new UsuarioLoginResponseDTO(resposta);
    }
}
