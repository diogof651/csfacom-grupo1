package com.example.ledes.infraestrutura.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class UsuarioLoginSenhaRequestDTO {
    private String senha;
    private String hash;
}
