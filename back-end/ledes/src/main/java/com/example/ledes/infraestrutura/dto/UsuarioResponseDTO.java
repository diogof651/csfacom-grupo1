package com.example.ledes.infraestrutura.dto;

import lombok.Data;

@Data
public class UsuarioResponseDTO {
    private Long id;
    private String nome;
    private String email;
    private boolean ativo;

    public UsuarioResponseDTO(Long id, String nome, String email, boolean ativo) {
        this.id = id;
        this.nome = nome;
        this.email = email;
        this.ativo = ativo;
    }

    // Getters e setters (você pode gerar automaticamente se estiver usando uma IDE)
}