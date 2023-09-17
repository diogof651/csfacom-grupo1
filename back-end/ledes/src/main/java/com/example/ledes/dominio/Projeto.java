package com.example.ledes.dominio;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data // getters e setters
@NoArgsConstructor
public class Projeto {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String nome;

    private String descricao;

    private Date inicio;

    private Date termino;

    private String status;

    private String tipo;

    private Boolean ativo;

    public Projeto(String nome, String descricao, Date inicio, Date termino, String status, String tipo, Boolean ativo) {
        this.nome = nome;
        this.descricao = descricao;
        this.inicio = inicio;
        this.termino = termino;
        this.status = status;
        this.tipo = tipo;
        this.ativo = ativo;
    }
}
