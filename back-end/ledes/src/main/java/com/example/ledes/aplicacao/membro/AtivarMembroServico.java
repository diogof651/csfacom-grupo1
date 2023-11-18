package com.example.ledes.aplicacao.membro;

import java.util.Date;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.ledes.dominio.Membro;
import com.example.ledes.dominio.Usuario;
import com.example.ledes.infraestrutura.MembroRepositorio;
import com.example.ledes.infraestrutura.UsuarioRepositorio;
import com.example.ledes.infraestrutura.dto.MembroResponseDTO;

@Service
public class AtivarMembroServico {

    @Autowired
    private MembroRepositorio membroRepositorio;

    @Autowired
    private UsuarioRepositorio usuarioRepositorio;

    @Transactional
    public MembroResponseDTO ativar(Long id, String hash) {
        Membro membro = membroRepositorio.findById(id).orElse(null);
        Optional<Usuario> usuario = usuarioRepositorio.findByCodigoHash(hash);
        
        if (usuario.get().possuiPermissao("ADMIN")) {

            if (membro != null) {
                if (!membro.isAtivo()) {
                    membro.setAtivo(true);
                    membro.setDataIngresso(new Date());
                    membro.setDataTermino(null);
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
            } else {
                return null;
            }
        }
        return null;
    }
}
