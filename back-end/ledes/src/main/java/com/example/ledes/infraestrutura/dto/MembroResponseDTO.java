package com.example.ledes.infraestrutura.dto;

import java.util.Date;
import java.util.List;

import com.example.ledes.dominio.Papel;
import com.example.ledes.dominio.Projeto;
import com.example.ledes.dominio.Usuario;
import com.example.ledes.dominio.Vinculo;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class MembroResponseDTO {
    private Long id;
    private Usuario usuario;
    private Projeto projeto;
    private List<Papel> papeis;
    private List<Vinculo> vinculos;
    private Date dataIngresso;
    private Date dataTermino;
    private boolean ativo;
}