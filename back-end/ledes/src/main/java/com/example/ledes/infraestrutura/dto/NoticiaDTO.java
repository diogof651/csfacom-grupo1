package com.example.ledes.infraestrutura.dto;

import java.util.Date;
import java.util.List;

import lombok.Getter;

@Getter
public class NoticiaDTO {
    //Classe que representa entidade noticia.
    private Long id;
    private String titulo;
    private String descricao;
    private String autor;
    private Date data;
    private String estado;
    private String thumbnail; // Opcional
    private Date dataPublicacao; // Opcional
    private List<String> anexos; // Opcional
}