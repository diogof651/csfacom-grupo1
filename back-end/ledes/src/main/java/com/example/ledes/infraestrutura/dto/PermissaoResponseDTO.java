package com.example.ledes.infraestrutura.dto;

public class PermissaoResponseDTO {
    private String nome;

    public PermissaoResponseDTO(String nome) {
        this.nome = nome;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }
}

