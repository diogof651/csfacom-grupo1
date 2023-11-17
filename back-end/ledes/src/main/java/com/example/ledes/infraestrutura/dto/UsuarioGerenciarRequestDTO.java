package com.example.ledes.infraestrutura.dto;

import java.util.Set;

import com.example.ledes.dominio.Permissao;

import lombok.Data;

@Data
public class UsuarioGerenciarRequestDTO {
    private String nome;
    private String email;
    private Boolean ativo;
    private Set<Permissao> permissoes;
}
