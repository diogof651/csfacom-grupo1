package com.example.ledes.dominio;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Permissao {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nome;

   
    public String getNome() {
        return nome;
    }

    public Object getUsuario() {
        return null;
    }
}