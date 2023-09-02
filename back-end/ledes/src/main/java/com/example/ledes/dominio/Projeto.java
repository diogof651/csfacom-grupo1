package com.example.ledes.dominio;

import javax.persistence.Column;
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
    // nome, descrição, período (início e término), e status do
    // projeto (Em andamento, Concluído, Descontinuado).

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(nullable = false)
    private String nome;

    public Projeto(String nome) {
        this.nome = nome;
    }
}
