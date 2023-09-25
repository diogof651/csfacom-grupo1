package com.example.ledes.infraestrutura.dto;

import lombok.Data;

import java.util.Date;

@Data
public class MembroResponseDTO {
    private String nome;
    private String foto;
    private String vinculos;
    private String papeis;
    private Date dataIngresso;
    private Date dataTermino;
    private boolean ativo;

    public MembroResponseDTO(String nome, String foto, String vinculos, String papeis, Date dataIngresso, Date dataTermino, boolean ativo) {
        this.nome = nome;
        this.foto = foto;
        this.vinculos = vinculos;
        this.papeis = papeis;
        this.dataIngresso = dataIngresso;
        this.dataTermino = dataTermino;
        this.ativo = ativo;
    }

    // Getters e setters
}
