package com.example.ledes.infraestrutura.dto;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ProjetoResponseDTO {
    private Long id;
    private String nome;
    private String descricao;
    private Date inicio; // Data de início do projeto
    private Date termino; // Data de término do projeto
    private String status; // Status do projeto (Em andamento, Concluído, Descontinuado)
    private String tipo; // Tipo de projeto
    private Boolean ativo; //se o projeto está ativo ou não
}
