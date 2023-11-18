package com.example.ledes.infraestrutura.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class TipoProjetoResponseDTO {
    public TipoProjetoResponseDTO(String resposta) {

    }

    private Long id;
    private String nome; // Tipo de projeto
    private Boolean ativo; // se o projeto está ativo ou não
}
