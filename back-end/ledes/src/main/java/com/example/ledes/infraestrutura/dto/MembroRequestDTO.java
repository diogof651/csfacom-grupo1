package com.example.ledes.infraestrutura.dto;

import java.sql.Date;
import java.util.Collection;

import com.example.ledes.dominio.TipoVinculo;

import lombok.Getter;

@Getter
public class MembroRequestDTO {
    private String nome;
    private String email;
    private Date dataIngresso;
    private Date dataTermino;
    private boolean ativo;
    private Collection<TipoVinculo> vinculos;
}