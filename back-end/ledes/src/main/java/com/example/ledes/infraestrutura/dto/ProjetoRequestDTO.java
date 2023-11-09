package com.example.ledes.infraestrutura.dto;

import java.util.Date;

import com.example.ledes.dominio.TipoProjeto;

import lombok.Data;

@Data
public class ProjetoRequestDTO {

    private String nome;

    private String descricao;

    private Date inicio;

    private Date termino;

    private String status;

    private TipoProjeto tipoProjeto;
}