package com.example.ledes.infraestrutura.dto;

import java.util.Date;

import com.example.ledes.dominio.Projeto;
import com.example.ledes.dominio.Usuario;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class MembroResponseDTO {
    private Long id;
    private Usuario usuario;
    private Projeto projeto;
    private Date dataIngresso;
    private Date dataTermino;
    private boolean ativo;
}