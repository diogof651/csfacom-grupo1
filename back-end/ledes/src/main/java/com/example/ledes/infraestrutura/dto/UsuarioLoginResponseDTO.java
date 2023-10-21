package com.example.ledes.infraestrutura.dto;

import lombok.AllArgsConstructor;
import lombok.Data;


@Data
@AllArgsConstructor
public class UsuarioLoginResponseDTO {
    private String resposta; // hash ou erro
}