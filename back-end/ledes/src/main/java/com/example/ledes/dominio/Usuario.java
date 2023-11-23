package com.example.ledes.dominio;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.Table;

import org.springframework.lang.Nullable;

import com.example.ledes.utils.HashUtils;

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
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nome;
    private String email;
    @Nullable
    private String senha;
    private boolean ativo;
    private String fotoPerfil;
    private String linkedin;
    private String github;
    private String codigoUnico;
    private Date dataAcesso;
    private String codigoHash;
    @ManyToMany
    @JoinTable(name = "usuario_permissoes", joinColumns = @JoinColumn(name = "usuario_id"), inverseJoinColumns = @JoinColumn(name = "permissao_id"))
    private Set<Permissao> permissoes = new HashSet<>();

    public Usuario(String nome, String email, String codigoUnico, Set<Permissao> permissoes) {
        this.nome = nome;
        this.email = email;
        this.ativo = true;
        this.codigoUnico = codigoUnico;
        this.permissoes = permissoes;
    }

    public Usuario(String nome, String email, String codigoUnico) {
        this.nome = nome;
        this.email = email;
        this.ativo = true;
        this.codigoUnico = codigoUnico;
    }

    public void logar() {
        this.dataAcesso = new Date();
        this.codigoHash = HashUtils.gerarHash(this.nome, this.dataAcesso);
    }

    public boolean possuiPermissao(String nomePermissao) {
        if (permissoes.isEmpty()) {
            return false;
        } else {
            return permissoes.stream()
                    .anyMatch(permissao -> permissao.getNome().equals(nomePermissao));
        }
    }

}