package com.example.ledes.dominio;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.Table;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
@Entity
@Table(name = "noticia")

public class Noticia {

    

    public Noticia(String titulo, String descricao, String autor, String conteudo, String estado, byte[] thumbnail,
            Date dataPublicacao, byte[] anexosPdf, Boolean emDestaque) {
        this.titulo = titulo;
        this.descricao = descricao;
        this.autor = autor;
        this.conteudo = conteudo;
        this.estado = estado;
        this.thumbnail = thumbnail;
        this.dataPublicacao = dataPublicacao;
        this.anexosPdf = anexosPdf;
        this.emDestaque = emDestaque;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String titulo;

    private String descricao;

    private String autor;

    private String conteudo;

    private String estado;

    @Lob
    private byte[] thumbnail;

    private Date dataPublicacao;

    @Lob
    private byte[] anexosPdf;

    private Boolean emDestaque;

}