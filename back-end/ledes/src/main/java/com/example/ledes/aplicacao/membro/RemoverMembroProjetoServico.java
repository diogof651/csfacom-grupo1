package com.example.ledes.aplicacao.membro;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.webjars.NotFoundException;

import com.example.ledes.infraestrutura.MembroRepositorio;

@Service
public class RemoverMembroProjetoServico {

    private final MembroRepositorio membroRepositorio;

    
    public RemoverMembroProjetoServico(MembroRepositorio membroRepositorio) {
        this.membroRepositorio = membroRepositorio;
    }
    
    @Transactional
    public void removerMembro(Long membroId) {
        // Verifique se o membro existe antes de removê-lo
        if (membroRepositorio.existsById(membroId)) {
            membroRepositorio.deleteById(membroId);
        } else {
            throw new NotFoundException("Membro não encontrado");
        }
    }
}
