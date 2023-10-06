package com.example.ledes.aplicacao.membro;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.ledes.dominio.Membro;
import com.example.ledes.dominio.Projeto;   
import com.example.ledes.dominio.Usuario;
import com.example.ledes.infraestrutura.MembroRepositorio;
import com.example.ledes.infraestrutura.ProjetoRepositorio;
import com.example.ledes.infraestrutura.UsuarioRepositorio;
import com.example.ledes.infraestrutura.dto.MembroRequestDTO;
import com.example.ledes.infraestrutura.dto.MembroResponseDTO;

@Service
public class CadastrarMembroServico {

    @Autowired
    public MembroRepositorio membroRepositorio;
    @Autowired
    public ProjetoRepositorio projetoRepositorio;
    @Autowired
    private UsuarioRepositorio usuarioRepositorio;

    public MembroResponseDTO adicionar(Long idProjeto, MembroRequestDTO membroRequestDTO) {
        Projeto projeto = projetoRepositorio.findById(idProjeto).orElse(null);
        if (projeto == null) {
            // Trate o cenário em que o projeto não foi encontrado.
            // Pode ser uma boa ideia lançar uma exceção ou tomar outra ação apropriada.
            // Exemplo: throw new ProjetoNaoEncontradoException("Projeto não encontrado");
        }

        Usuario usuario = usuarioRepositorio.findByEmail(membroRequestDTO.getEmail());

        if (usuario == null) {
            usuario = new Usuario(membroRequestDTO.getNome(), membroRequestDTO.getEmail());
            usuarioRepositorio.save(usuario);
        }
        

        Membro membro = new Membro(membroRequestDTO.getDataIngresso(), membroRequestDTO.getDataTermino(),
                membroRequestDTO.isAtivo(), usuario, projeto);

        membroRepositorio.save(membro);

        return new MembroResponseDTO(membro.getId(),
                membro.getUsuario(),
                membro.getProjeto(),
                membro.getDataIngresso(),
                membro.getDataTermino(),
                membro.isAtivo());
    }
}
