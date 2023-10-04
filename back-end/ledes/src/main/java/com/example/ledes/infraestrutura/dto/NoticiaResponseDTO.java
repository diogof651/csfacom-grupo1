package com.example.ledes.infraestrutura.dto;

import java.util.Collection;
import java.util.Date;

import com.example.ledes.dominio.Usuario;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class NoticiaResponseDTO {
    private Long id;
    private String titulo;
    private Usuario autor;
    private String conteudo;
    private String estado;
    private String thumbnail; // Opcional
    private Date dataPublicacao; // Opcional
    private Boolean emDestaque; 
    private Collection<AnexoDTO> anexos;
}
