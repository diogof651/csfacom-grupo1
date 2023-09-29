package com.example.ledes.dominio;

import java.util.Date;
import java.util.Set;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "membro")
@Builder

public class Membro {
    
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private TipoVinculo tipoVinculo;
    private TipoPapel tipoPapel;
    private Date dataIngresso;
    private Date dataTermino;
    private boolean ativo;

    @ManyToOne
    @JoinColumn(name = "usuario_id")
    private Usuario usuario;

    @ManyToMany
    @JoinTable(
    name = "projetos_ativos", 
    joinColumns = @JoinColumn(name = "membro_id"), 
    inverseJoinColumns = @JoinColumn(name = "projeto_id"))
    Set<Projeto> projetos_ativos;

    
}