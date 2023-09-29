package com.example.ledes.infraestrutura.dto;

import java.sql.Date;

import lombok.Data;
@Data
public class MembroRequestDTO {
    private String nome;
    private String email;
    private String TipoVinculo;
    private String tipoPapel;
    private Date dataIngresso;
    private Date dataTermino;
    private boolean ativo;
}
