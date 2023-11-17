package com.example.ledes.aplicacao.membro;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.ledes.aplicacao.usuario.AdicionarUsuarioServico;
import com.example.ledes.dominio.Membro;
import com.example.ledes.dominio.Projeto;
import com.example.ledes.dominio.Usuario;
import com.example.ledes.infraestrutura.MembroRepositorio;
import com.example.ledes.infraestrutura.ProjetoRepositorio;
import com.example.ledes.infraestrutura.UsuarioRepositorio;
import com.example.ledes.infraestrutura.dto.MembroRequestDTO;
import com.example.ledes.infraestrutura.dto.MembroResponseDTO;
import com.example.ledes.infraestrutura.dto.UsuarioDTO;

@Service
public class CadastrarMembroServico {

    @Autowired
    public MembroRepositorio membroRepositorio;
    @Autowired
    public ProjetoRepositorio projetoRepositorio;
    @Autowired
    private UsuarioRepositorio usuarioRepositorio;
    @Autowired
    private AdicionarUsuarioServico adicionarUsuarioServico;

    public MembroResponseDTO adicionar(Long idProjeto, MembroRequestDTO membroRequestDTO) {
        Projeto projeto = projetoRepositorio.findById(idProjeto).orElse(null);

        Usuario usuario = usuarioRepositorio.findByEmail(membroRequestDTO.getEmail());

        if (usuario == null) {
            adicionarUsuarioServico.adicionar(new UsuarioDTO(membroRequestDTO.getNome(), membroRequestDTO.getEmail()));
            usuario = usuarioRepositorio.findByEmail(membroRequestDTO.getEmail());
        }

        Membro membro = new Membro(membroRequestDTO.getDataIngresso(), membroRequestDTO.getDataTermino(),
                membroRequestDTO.isAtivo(), usuario, projeto, membroRequestDTO.getPapeis(),
                membroRequestDTO.getVinculos());

        membroRepositorio.save(membro);

        return new MembroResponseDTO(membro.getId(),
                membro.getUsuario(),
                membro.getProjeto(),
                membro.getDataIngresso(),
                membro.getDataTermino(),
                membro.isAtivo(), membro.getPapeis(), membro.getVinculos());
    }
}
