package com.example.ledes.dominio;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Anexo {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String titulo;

    private String conteudo;

    @ManyToOne
    @JoinColumn(name = "noticia_id", nullable = false)
    private Noticia noticia;

    public Anexo(String titulo, String conteudo, Noticia noticia) {
        this.titulo = titulo;
        this.conteudo = conteudo;
        this.noticia = noticia;
    }
}
