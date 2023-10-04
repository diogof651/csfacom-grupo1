package com.example.ledes.dominio;

import java.util.Date;
import java.util.List;

import javax.persistence.CollectionTable;
import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
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

    @ManyToOne
    @JoinColumn(name = "projeto_id")
    private Projeto projeto;

    @ElementCollection(targetClass = TipoVinculo.class)
    @Enumerated(EnumType.STRING)
    @CollectionTable(name = "membro_tipos_vinculo")
    @Column(name = "tipo_vinculo")
    private List<TipoVinculo> tiposVinculo;

    @ElementCollection(targetClass = TipoPapel.class)
    @Enumerated(EnumType.STRING)
    @CollectionTable(name = "membro_tipos_papel")
    @Column(name = "tipo_papel")
    private List<TipoPapel> tiposPapel;
}