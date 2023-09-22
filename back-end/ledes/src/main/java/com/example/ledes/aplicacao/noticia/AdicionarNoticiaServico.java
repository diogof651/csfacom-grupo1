package com.example.ledes.aplicacao.noticia;

import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.ledes.dominio.Noticia;
import com.example.ledes.infraestrutura.NoticiaRepositorio;
import com.example.ledes.infraestrutura.dto.NoticiaRequestDTO;
import com.example.ledes.infraestrutura.dto.NoticiaResponseDTO;

@Service
public class AdicionarNoticiaServico {
    @Autowired
    private NoticiaRepositorio noticiaRepositorio;

    public NoticiaResponseDTO adicionar(NoticiaRequestDTO noticiaRequest) {

        if ("publicacao_imediata".equals(noticiaRequest.getEstado())) {
            noticiaRequest.setData(new Date()); // Define a data como a data atual para publicação imediata
        } else if ("rascunho".equals(noticiaRequest.getEstado())) {
            noticiaRequest.setData(null); // Não define a data para rascunho
        } else if ("agendada".equals(noticiaRequest.getEstado())) {
            Date dataAgendada = noticiaRequest.getDataPublicacao();
            Date dataAtual = new Date();

            if (dataAgendada != null && dataAgendada.after(dataAtual)) {
                // A data agendada é válida 
                noticiaRequest.setData(dataAgendada);
            } else {
                // A data agendada não é válida
                throw new IllegalArgumentException("A data de agendamento deve estar no futuro.");
            }
        }

        Noticia noticia = new Noticia(noticiaRequest.getTitulo(), noticiaRequest.getDescricao(), noticiaRequest.getAutor(), 
        noticiaRequest.getData(), noticiaRequest.getConteudo(), noticiaRequest.getEstado(), noticiaRequest.getThumbnail(),
        noticiaRequest.getDataPublicacao(), noticiaRequest.getAnexos(), noticiaRequest.getEmDestaque());
        
        noticiaRepositorio.save(noticia);        
        
        return new NoticiaResponseDTO(noticia.getId(), noticia.getTitulo(), noticia.getDescricao(), noticia.getAutor(), noticia.getData(),
         noticia.getConteudo(), noticia.getEstado(), noticia.getThumbnail(), noticia.getDataPublicacao(), noticia.getAnexosPdf(), noticia.getEmDestaque());
    }
}
