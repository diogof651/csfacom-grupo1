package com.example.ledes.dominio;

import java.util.Collection;
import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "membro")
public class Membro {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private Date dataIngresso;
    private Date dataTermino;
    private boolean ativo;

    @ManyToOne
    @JoinColumn(name = "usuario_id")
    private Usuario usuario;

    @ManyToOne
    @JoinColumn(name = "projeto_id")
    private Projeto projeto;

    @ManyToMany
    private Collection<TipoVinculo> vinculos;

    public Membro(Date dataIngresso, Date dataTermino, boolean ativo, Usuario usuario, Projeto projeto,
            Collection<TipoVinculo> tipoVinculo) {
        this.dataIngresso = dataIngresso;
        this.dataTermino = dataTermino;
        this.ativo = ativo;
        this.usuario = usuario;
        this.projeto = projeto;
        this.vinculos = tipoVinculo;
    }
}
