package com.example.ledes.infraestrutura.dto;

import java.util.Date;

import lombok.Data;

@Data
public class NoticiaRequestDTO {
    private String titulo;
    private String descricao;
    private String autor;
    private Date data;
    private String estado;
    private String thumbnail; // Opcional
    private Date dataPublicacao; // Opcional
    private byte[] anexos; // Opcional
}
