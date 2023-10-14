package com.example.ledes.dominio;

import java.text.SimpleDateFormat;
import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.example.ledes.utils.HashUtils;
import com.example.ledes.utils.SenhaUtils;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "usuario")

public class Usuario {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String nome;
    private String email;
    private String senha;
    private boolean ativo;
    private String fotoPerfil;
    private String linkedin;
    private String github;
    private Date dataAcesso;
    private String codigoHash;

    public Usuario(String nome, String email, String senha, boolean ativo, String fotoPerfil, String linkedin,
            String github) {
        this.nome = nome;
        this.email = email;
        this.senha = senha;
        this.ativo = ativo;
        this.fotoPerfil = fotoPerfil;
        this.linkedin = linkedin;
        this.github = github;
    }

    public Usuario(String nome, String email) {
        this.nome = nome;
        this.email = email;
        this.senha = SenhaUtils.gerarSenhaCriptografada("123456");
        this.ativo = true;
    }

    public void logar(){
        this.dataAcesso = new Date();
        this.codigoHash = HashUtils.gerarHash(this.nome, this.dataAcesso);
    }
}