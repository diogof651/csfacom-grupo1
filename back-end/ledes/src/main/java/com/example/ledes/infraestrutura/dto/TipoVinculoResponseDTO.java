package com.example.ledes.infraestrutura.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class TipoVinculoResponseDTO {
    public TipoVinculoResponseDTO(String resposta) {
        
    }
    private Long id;
    private String nome; // Nome do vinculo
    private Boolean ativo; // se o tipo de vinculo está ativo ou não
}