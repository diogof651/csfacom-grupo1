package com.example.ledes.dominio;

import java.util.Date;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data // getters e setters
@NoArgsConstructor
public class Projeto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;

    private String descricao;

    private Date inicio;

    private Date termino;

    private String status;

    private Boolean ativo;

    @ManyToOne
    private TipoProjeto tipoProjeto;

    @JsonIgnore
    @OneToMany(mappedBy = "projeto")
    List<Membro> membros;

    public Projeto(String nome, String descricao, Date inicio, Date termino, String status, TipoProjeto tipoProjeto) {
        this.nome = nome;
        this.descricao = descricao;
        this.inicio = inicio;
        this.termino = termino;
        this.status = status;
        this.tipoProjeto = tipoProjeto;
        this.ativo = true;
    }
}
