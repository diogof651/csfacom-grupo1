package com.example.ledes.aplicacao.projeto;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.ledes.dominio.Projeto;
import com.example.ledes.dominio.TipoProjeto;
import com.example.ledes.dominio.Usuario;
import com.example.ledes.infraestrutura.ProjetoRepositorio;
import com.example.ledes.infraestrutura.TipoProjetoRepositorio;
import com.example.ledes.infraestrutura.UsuarioRepositorio;
import com.example.ledes.infraestrutura.dto.ProjetoRequestDTO;
import com.example.ledes.infraestrutura.dto.ProjetoResponseDTO;

@Service
public class AdicionarProjetoServico {
    @Autowired
    private ProjetoRepositorio projetoRepositorio;

    @Autowired
    private TipoProjetoRepositorio tipoProjetoRepositorio;
    @Autowired
    private UsuarioRepositorio usuarioRepositorio;

    public ProjetoResponseDTO adicionar(ProjetoRequestDTO projetoRequest, String hash) {
        Optional<Usuario> usuario = usuarioRepositorio.findByCodigoHash(hash);
        if (usuario.isPresent()) {
            if (usuario.get().possuiPermissao("Admin") || usuario.get().possuiPermissao("Editor")) {
                TipoProjeto tipoProjeto = tipoProjetoRepositorio.findByNome(projetoRequest.getTipoProjeto());
                Projeto projeto = new Projeto(projetoRequest.getNome(), projetoRequest.getDescricao(),
                        projetoRequest.getInicio(), projetoRequest.getTermino(), projetoRequest.getStatus(),
                        tipoProjeto);
                projetoRepositorio.save(projeto);
                return new ProjetoResponseDTO(projeto.getId(), projeto.getNome(), projeto.getDescricao(),
                        projeto.getInicio(),
                        projeto.getTermino(), projeto.getStatus(), projeto.getTipoProjeto(), projeto.getAtivo());
            }
        }
        return null;
    }
}
