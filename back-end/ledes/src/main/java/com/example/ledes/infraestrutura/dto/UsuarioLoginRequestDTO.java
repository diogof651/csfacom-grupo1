package com.example.ledes.infraestrutura.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class UsuarioLoginRequestDTO {
    private String email;
    private String senha;
}
