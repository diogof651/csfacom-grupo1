package com.example.ledes.infraestrutura.dto;

import java.util.Date;

import lombok.Data;

@Data
public class NoticiaRequestDTO {
    private String titulo;
    private String descricao;
    private String autor;
    private String conteudo;
    private String estado;
    private byte[] thumbnail; // Opcional
    private Date dataPublicacao; // Opcional
    private byte[] anexos; // Opcional
    private Boolean emDestaque; //Opcional
}
