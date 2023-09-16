package com.example.ledes.infraestrutura.dto;

import lombok.Getter;

@Getter
public class UsuarioDTO {
    //Classe que representa entidade usuário.
    private String nome;
    private String email;
    private Boolean ativo;
    public String isAtivo() {
        return null;
    }    
}
