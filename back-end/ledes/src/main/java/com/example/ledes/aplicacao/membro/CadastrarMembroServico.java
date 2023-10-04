package com.example.ledes.aplicacao.membro;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.ledes.dominio.Membro;
import com.example.ledes.dominio.TipoPapel;
import com.example.ledes.dominio.TipoVinculo;
import com.example.ledes.dominio.Usuario;
import com.example.ledes.infraestrutura.MembroRepositorio;
import com.example.ledes.infraestrutura.UsuarioRepositorio;
import com.example.ledes.infraestrutura.dto.MembroRequestDTO;
import com.example.ledes.infraestrutura.dto.MembroResponseDTO;

@Service
public class CadastrarMembroServico {

    @Autowired
    public MembroRepositorio membroRepositorio;
    @Autowired
    private UsuarioRepositorio usuarioRepositorio;

    public MembroResponseDTO adicionar(MembroRequestDTO membroRequestDTO) {
        // adicionar verificação se o email já existe na base de dados
        Usuario usuarioExistente = usuarioRepositorio.findByEmail(membroRequestDTO.getEmail());


            if (usuarioExistente != null) {
                Membro membro = Membro.builder()
                .usuario(usuarioExistente)
                .tipoVinculo(TipoVinculo.valueOf(membroRequestDTO.getTipoVinculo())) 
                .tipoPapel(TipoPapel.valueOf(membroRequestDTO.getTipoPapel())) 
                .dataIngresso(membroRequestDTO.getDataIngresso())
                .dataTermino(membroRequestDTO.getDataTermino())
                .ativo(membroRequestDTO.isAtivo()).build();

                return new MembroResponseDTO(membro.getId(),
                membro.getUsuario(), 
                membro.getTipoVinculo(),
                membro.getTipoPapel(),
                membro.getDataIngresso(), 
                membro.getDataTermino(), 
                membro.isAtivo());
           
            } else {
                Usuario novoUsuario = new Usuario(membroRequestDTO.getNome(), membroRequestDTO.getEmail());
                usuarioRepositorio.save(novoUsuario);
    
                Membro membroNovo = new Membro();
                membroNovo.setUsuario(novoUsuario);
                membroNovo.setTipoVinculo(membroNovo.getTipoVinculo()); 
                membroNovo.setTipoPapel(membroNovo.getTipoPapel()); 
                membroNovo.setDataIngresso((membroNovo.getDataIngresso()));
                membroNovo.setDataTermino(membroNovo.getDataIngresso());
                membroNovo.setAtivo(membroNovo.isAtivo());
                membroRepositorio.save(membroNovo);

                return new MembroResponseDTO(membroNovo.getId(),
                membroNovo.getUsuario(), 
                membroNovo.getTipoVinculo(),
                membroNovo.getTipoPapel(),
                membroNovo.getDataIngresso(), 
                membroNovo.getDataTermino(), 
                membroNovo.isAtivo());
            }  
        }
    }


    

