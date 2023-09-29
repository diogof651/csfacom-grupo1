package com.example.ledes.infraestrutura.dto;

import java.util.Date;

import com.example.ledes.dominio.TipoPapel;
import com.example.ledes.dominio.TipoVinculo;
import com.example.ledes.dominio.Usuario;

import lombok.AllArgsConstructor;
import lombok.Data;


@Data
@AllArgsConstructor
public class MembroResponseDTO {
    private Long id; 
    private Usuario usuario;
    private String nome;
    private String email;
    private TipoVinculo TipoVinculo;
    private TipoPapel tipoPapel; 
    private Date dataIngresso; 
    private Date dataTermino; 
    private boolean ativo; 
}