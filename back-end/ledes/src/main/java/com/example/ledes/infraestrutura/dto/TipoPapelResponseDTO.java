package com.example.ledes.infraestrutura.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class TipoPapelResponseDTO {
    public TipoPapelResponseDTO(String resposta){
        
    }
    private Long id;
    private String nome; // Tipo de papel
    private Boolean ativo; // se o papel está ativo ou não
}
