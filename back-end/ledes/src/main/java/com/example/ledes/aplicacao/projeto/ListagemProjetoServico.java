package com.example.ledes.aplicacao.projeto;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.ledes.dominio.Projeto;
import com.example.ledes.dominio.Usuario;
import com.example.ledes.infraestrutura.ProjetoRepositorio;
import com.example.ledes.infraestrutura.UsuarioRepositorio;
import com.example.ledes.infraestrutura.dto.ProjetoResponseDTO;

@Service
public class ListagemProjetoServico {

    @Autowired
    private ProjetoRepositorio projetoRepositorio;
    @Autowired
    private UsuarioRepositorio usuarioRepositorio;

    public List<ProjetoResponseDTO> listarProjetos(String hash) {

        Optional<Usuario> usuario = usuarioRepositorio.findByCodigoHash(hash);
        if (usuario.get().possuiPermissao("ADMIN") || usuario.get().possuiPermissao("EDITORPROJETO")) {
            List<Projeto> projetos = (List<Projeto>) projetoRepositorio.findAll();
            return projetos.stream()
                    .map(this::converterParaDTO)
                    .collect(Collectors.toList());
        } else {
            return null;
        }
    }

    private ProjetoResponseDTO converterParaDTO(Projeto projeto) {
        return new ProjetoResponseDTO(
                projeto.getId(),
                projeto.getNome(),
                projeto.getDescricao(),
                projeto.getInicio(),
                projeto.getTermino(),
                projeto.getStatus(),
                projeto.getTipoProjeto(),
                projeto.getAtivo());
    }
}