package com.example.ledes.dominio;


import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data // getters e setters
@NoArgsConstructor
public class TipoVinculo {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String nome;

    private Boolean ativo;

    public TipoVinculo(String nome) {
        this.nome = nome;
    }
}