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
public class TipoPapel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String tipo;

    private Boolean ativo;

    public TipoPapel(String tipo) {
        this.tipo = tipo;
    }
}
