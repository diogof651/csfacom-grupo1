package com.example.ledes.infraestrutura.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class DefinirSenhaRequestDTO {
    private String codigoUnico;
    private String senha;
}
