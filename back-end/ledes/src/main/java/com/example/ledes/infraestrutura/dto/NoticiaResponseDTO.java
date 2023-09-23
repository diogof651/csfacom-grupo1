package com.example.ledes.infraestrutura.dto;

import java.util.Collection;
import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class NoticiaResponseDTO {
    private Long id;
    private String titulo;
    private String descricao;
    private String autor;
    private String conteudo;
    private String estado;
    private String thumbnail; // Opcional
    private Date dataPublicacao; // Opcional
    private Boolean emDestaque; //Opcional
    private Collection<AnexoDTO> anexos;
}
