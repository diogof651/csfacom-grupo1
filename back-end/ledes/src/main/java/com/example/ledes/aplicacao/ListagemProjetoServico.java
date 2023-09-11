package com.example.ledes.aplicacao;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.ledes.dominio.Projeto;
import com.example.ledes.infraestrutura.ProjetoRepositorio;

@Service
public class ListagemProjetoServico {

    @Autowired
    private ProjetoRepositorio projetoRepositorio;

    public List<Projeto> listarProjetos() {
        return (List<Projeto>) projetoRepositorio.findAll();
    }
}