package com.example.ledes.infraestrutura.dto;

import java.util.Collection;
import java.util.Date;

import lombok.Data;

@Data
public class NoticiaRequestDTO {
    private String titulo;
    private Long autor_id;
    private String conteudo;
    private String estado;
    private String thumbnail; // Opcional
    private Date dataPublicacao; // Opcional
    private Boolean emDestaque; // Opcional
    private Collection<AnexoDTO> anexos;
}
