package com.example.ledes.infraestrutura.dto;

import java.sql.Date;

import com.example.ledes.dominio.TipoPapel;
import com.example.ledes.dominio.TipoVinculo;

import lombok.AllArgsConstructor;
import lombok.Data;


@Data
@AllArgsConstructor
public class MembroResponseDTO {
    String nome;
    String email;
    TipoVinculo TipoVinculo;
    TipoPapel tipoPapel; 
    Date dataIngresso; 
    Date dataTermino; 
    boolean ativo; 
}