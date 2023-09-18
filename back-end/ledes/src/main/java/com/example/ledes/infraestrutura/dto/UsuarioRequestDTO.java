package com.example.ledes.infraestrutura.dto;

import lombok.Data;

@Data
public class UsuarioRequestDTO {
    private String nome;
    private String email;
    private String senha;
    private boolean ativo;
    private String fotoPerfil;
    private String link;
    
}
