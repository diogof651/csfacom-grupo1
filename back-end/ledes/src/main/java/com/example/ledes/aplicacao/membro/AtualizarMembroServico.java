package com.example.ledes.aplicacao.membro;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.ledes.dominio.Membro;
import com.example.ledes.dominio.Usuario;
import com.example.ledes.infraestrutura.MembroRepositorio;
import com.example.ledes.infraestrutura.UsuarioRepositorio;
import com.example.ledes.infraestrutura.dto.MembroRequestDTO;
import com.example.ledes.infraestrutura.dto.MembroResponseDTO;

@Service
public class AtualizarMembroServico {

    @Autowired
    public MembroRepositorio membroRepositorio;
    @Autowired
    private UsuarioRepositorio usuarioRepositorio;

    @Transactional
    public MembroResponseDTO atualizarMembro(Long id, MembroRequestDTO membroRequestDTO) {
        Membro membro = membroRepositorio.findById(id).orElse(null);
        Usuario usuario = usuarioRepositorio.findByEmail(membroRequestDTO.getEmail());

        if (membro != null) {
            if (usuario == null) {
                usuario = new Usuario(membroRequestDTO.getNome(), membroRequestDTO.getEmail());
                usuarioRepositorio.save(usuario);
            } else {
                usuario = membro.getUsuario();
            }

            membro.setDataIngresso(membroRequestDTO.getDataIngresso());
            membro.setDataTermino(membroRequestDTO.getDataTermino());
            membro.setUsuario(usuario);
            membro.setAtivo(membroRequestDTO.isAtivo());

            membroRepositorio.save(membro);

            return new MembroResponseDTO(membro.getId(),
                    membro.getUsuario(),
                    membro.getProjeto(),
                    membro.getDataIngresso(),
                    membro.getDataTermino(),
                    membro.isAtivo());

        } else {
            return null;
        }
    }
}