package com.example.ledes.aplicacao.projeto;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.ledes.dominio.Projeto;
import com.example.ledes.dominio.Usuario;
import com.example.ledes.infraestrutura.ProjetoRepositorio;
import com.example.ledes.infraestrutura.UsuarioRepositorio;
import com.example.ledes.infraestrutura.dto.ProjetoResponseDTO;

@Service
public class DesativarProjetoServico {
    @Autowired
    private ProjetoRepositorio projetoRepositorio;
    @Autowired
    private UsuarioRepositorio usuarioRepositorio;

    @Transactional
    public ProjetoResponseDTO desativar(Long id, String hash) {
        Projeto projeto = projetoRepositorio.findById(id).orElse(null);
        Optional<Usuario> usuario = usuarioRepositorio.findByCodigoHash(hash);
        if (usuario.get().possuiPermissao("ADMIN") || usuario.get().possuiPermissao("EDITORPROJETO")) {
            if (projeto != null && (usuario.isPresent())) {

                projeto.setAtivo(false);
                projetoRepositorio.save(projeto);

                return new ProjetoResponseDTO(projeto.getId(), projeto.getNome(), projeto.getDescricao(),
                        projeto.getInicio(),
                        projeto.getTermino(), projeto.getStatus(), projeto.getTipo(), projeto.getAtivo());
            }
        }

        return null;
    }
}
