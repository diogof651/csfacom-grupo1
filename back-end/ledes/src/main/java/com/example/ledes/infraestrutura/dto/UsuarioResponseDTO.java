package com.example.ledes.infraestrutura.dto;

import org.springframework.lang.Nullable;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UsuarioResponseDTO {
    private Long id;
    private String nome;
    private String email;
    private boolean ativo;
    private String foto;
    private String linkedin;
    private String github;
    @Nullable
    private String codigoUnico;

    public UsuarioResponseDTO(Long id, String nome, String email, boolean ativo, String fotoPerfil, String linkedin,
            String github) {
        this.id = id;
        this.nome = nome;
        this.email = email;
        this.ativo = ativo;
        this.foto = fotoPerfil;
        this.linkedin = linkedin;
        this.github = github;
    }

    public UsuarioResponseDTO(Long id, String nome, String email, String fotoPerfil, String linkedin,
            String github, String codigoUnico) {
        this.id = id;
        this.nome = nome;
        this.email = email;
        this.codigoUnico = codigoUnico;
        this.foto = fotoPerfil;
        this.linkedin = linkedin;
        this.github = github;
    }
}