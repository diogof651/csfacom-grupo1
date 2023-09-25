package com.example.ledes.dominio;

import java.sql.Date;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "membro")

public class Membro {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    
    private Long id;
    private String nome;
    @Column(unique = true)
    private String email;
    private TipoVinculo TipoVinculo;
    private TipoPapel tipoPapel;
    private Date dataIngresso;
    private Date dataTermino;
    private String password;
    private boolean ativo;

    @ManyToMany
    @JoinTable(
    name = "projetos_ativos", 
    joinColumns = @JoinColumn(name = "membro_id"), 
    inverseJoinColumns = @JoinColumn(name = "projeto_id"))
    Set<Projeto> projetos_ativos;


    public Membro(String nome, String email) {
        this.nome = nome;
        this.email = email;
    }


    public Membro(String nome, String email, String password) {
        this.nome = nome;
        this.email = email;
        this.password = password;
        this.ativo = true;
    }

    public Membro(String nome, String email, TipoVinculo tipoVinculo, TipoPapel tipoPapel, 
    Date dataIngresso, Date dataTermino, boolean ativo) {
        this.nome = nome;
        this.email = email;
        TipoVinculo = tipoVinculo;
        this.tipoPapel = tipoPapel;
        this.dataIngresso = dataIngresso;
        this.dataTermino = dataTermino;
        this.ativo = ativo;
    }

}