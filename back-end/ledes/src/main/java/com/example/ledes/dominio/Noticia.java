package com.example.ledes.dominio;

import java.util.Date;

import javax.persistence.Column;
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

    

    public Noticia(String titulo, String descricao, String autor, Date data, String estado, String thumbnail,
            Date dataPublicacao, byte[] anexosPdf) {
        this.titulo = titulo;
        this.descricao = descricao;
        this.autor = autor;
        this.data = data;
        this.estado = estado;
        this.thumbnail = thumbnail;
        this.dataPublicacao = dataPublicacao;
        this.anexosPdf = anexosPdf;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String titulo;

    @Column(nullable = false)
    private String descricao;

    @Column(nullable = false)
    private String autor;

    @Column(nullable = false)
    private Date data;

    @Column(nullable = false)
    private String estado;

    private String thumbnail;

    private Date dataPublicacao;

    @Lob
    private byte[] anexosPdf;

}