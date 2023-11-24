package com.example.ledes.infraestrutura.dto;

import java.util.Set;

import com.example.ledes.dominio.Permissao;

import lombok.Getter;

@Getter
public class UsuarioGerenciarRequestDTO {
    private String nome;
    private String email;
    private boolean ativo;
    private Set<Permissao> permissoes;
}
