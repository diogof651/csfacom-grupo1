package com.example.ledes.infraestrutura.dto;

import java.sql.Date;

import lombok.Getter;

@Getter
public class MembroRequestDTO {
    private String nome;
    private String email;
    private Date dataIngresso;
    private Date dataTermino;
    private boolean ativo;
}
