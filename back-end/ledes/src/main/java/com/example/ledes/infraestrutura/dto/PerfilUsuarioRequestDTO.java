package com.example.ledes.infraestrutura.dto;

import lombok.Data;

@Data
public class PerfilUsuarioRequestDTO {
    private String foto;
    private String nome;
    private String email;
    private String linkedin;
    private String github;
}
