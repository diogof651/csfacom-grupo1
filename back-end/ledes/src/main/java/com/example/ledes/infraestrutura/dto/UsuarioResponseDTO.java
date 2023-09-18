package com.example.ledes.infraestrutura.dto;

import lombok.AllArgsConstructor;
import lombok.Data;


@Data
@AllArgsConstructor

public class UsuarioResponseDTO {
    private Long id;
    private String nome;
    private String senha;
    private String email;
    private boolean ativo;
    private String fotoPerfil;
    private String link;


}