package com.example.ledes.dominio;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
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

    @OneToOne
    @JoinColumn(name = "autor_id", nullable = false)
    private Usuario autor;

    private String conteudo;

    private String estado;

    private String thumbnail;

    private Date dataPublicacao;

    private Boolean emDestaque;

    public Noticia(String titulo, Usuario autor, String conteudo, String estado, Boolean emDestaque,
            Date dataPublicacao) {
        this.titulo = titulo;
        this.autor = autor;
        this.conteudo = conteudo;
        this.estado = estado;
        this.emDestaque = emDestaque;
        definirDataDePublicacao(estado, dataPublicacao);
    }

    public void definirDataDePublicacao(String estado, Date dataPublicacao) {
        if ("Imediata".equals(estado)) {
            setDataPublicacao(new Date());
        } else if ("Agendada".equals(estado)) {
            setDataPublicacao(dataPublicacao);
        } else if("Rascunho".equals(estado)){
            setDataPublicacao(null);
        }
    }
}