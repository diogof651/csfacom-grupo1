package com.example.ledes.dominio;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Entity
@Table(name = "noticia")

public class Noticia {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String titulo;

    private String descricao;

    private String autor;

    private String conteudo;

    private String estado;

    private String thumbnail;

    private Date dataPublicacao;

    private Boolean emDestaque;

    public Noticia(String titulo, String descricao, String autor, String conteudo, String estado, Boolean emDestaque) {
        this.titulo = titulo;
        this.descricao = descricao;
        this.autor = autor;
        this.conteudo = conteudo;
        this.estado = estado;
        this.emDestaque = emDestaque;
    }
}