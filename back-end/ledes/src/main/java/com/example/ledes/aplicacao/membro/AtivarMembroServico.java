package com.example.ledes.aplicacao.membro;

import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.ledes.dominio.Membro;
import com.example.ledes.infraestrutura.MembroRepositorio;

@Service
public class AtivarMembroServico {

    @Autowired
    private MembroRepositorio membroRepositorio;

    @Transactional
    public String ativar(Long id) {
        Membro membro = membroRepositorio.findById(id).orElse(null);

        if (membro != null) {
            if(!membro.isAtivo()){
            membro.setAtivo(true);
            membro.setDataIngresso(new Date());
            membro.setDataTermino(null);
            membroRepositorio.save(membro);

            return "Membro ativado com sucesso!";
            }else{
                return "Membro já se encontra ativo!";
            }
        } else {
            return "Membro não encontrado!";
        }
    }
}
