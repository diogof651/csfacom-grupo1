package com.example.ledes.infraestrutura.dto;

import java.util.Date;

import lombok.Data;

@Data
public class ProjetoRequestDTO {

    private String nome;

    private String descricao;

    private Date inicio;

    private Date termino;

    private String status;

    private String tipo;
}