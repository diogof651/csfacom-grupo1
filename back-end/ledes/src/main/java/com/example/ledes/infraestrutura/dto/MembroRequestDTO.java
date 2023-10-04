package com.example.ledes.infraestrutura.dto;

import java.sql.Date;
import java.util.List;

import com.example.ledes.dominio.Papel;
import com.example.ledes.dominio.Vinculo;

import lombok.Getter;

@Getter
public class MembroRequestDTO {
    private String nome;
    private String email;
    private List<Papel> papeis;
    private List<Vinculo> vinculos;
    private Date dataIngresso;
    private Date dataTermino;
    private boolean ativo;
}
