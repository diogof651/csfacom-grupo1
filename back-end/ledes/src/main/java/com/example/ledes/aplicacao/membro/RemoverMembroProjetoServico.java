package com.example.ledes.aplicacao.membro;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.webjars.NotFoundException;

import com.example.ledes.dominio.Usuario;
import com.example.ledes.infraestrutura.MembroRepositorio;
import com.example.ledes.infraestrutura.UsuarioRepositorio;

@Service
public class RemoverMembroProjetoServico {

    private final MembroRepositorio membroRepositorio;
    @Autowired
    private UsuarioRepositorio usuarioRepositorio;

    public RemoverMembroProjetoServico(MembroRepositorio membroRepositorio) {
        this.membroRepositorio = membroRepositorio;
    }

    @Transactional
    public void removerMembro(Long membroId, String hash) {

        Optional<Usuario> usuariopermissao = usuarioRepositorio.findByCodigoHash(hash);

        if (usuariopermissao.get().possuiPermissao("ADMIN")) {

            // Verifique se o membro existe antes de removê-lo
            if (membroRepositorio.existsById(membroId)) {
                membroRepositorio.deleteById(membroId);
            } else {
                throw new NotFoundException("Membro não encontrado");
            }
        }
    }
}
