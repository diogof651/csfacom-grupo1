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
            noticiaRequest.setDataPublicacao(new Date()); // Define a data como a data atual para publicação imediata
        } else if ("rascunho".equals(noticiaRequest.getEstado())) {
            noticiaRequest.setDataPublicacao(null); // Não define a data para rascunho
        } else if ("agendada".equals(noticiaRequest.getEstado())) {
            Date dataAgendada = noticiaRequest.getDataPublicacao();
            Date dataAtual = new Date();

            if (dataAgendada != null && dataAgendada.after(dataAtual)) {
                // A data agendada é válida 
                noticiaRequest.setDataPublicacao(dataAgendada);
            } else {
                // A data agendada não é válida
                throw new IllegalArgumentException("A data de agendamento deve estar no futuro.");
            }
        }

        // Converte o campo 'thumbnail' e 'anexos' para um array de bytes
        byte[] thumbnailBytes = noticiaRequest.getThumbnail();
        byte[] anexosBytes = noticiaRequest.getAnexos();
        
        Noticia noticia = new Noticia(noticiaRequest.getTitulo(), noticiaRequest.getDescricao(), noticiaRequest.getAutor(), 
        noticiaRequest.getConteudo(), noticiaRequest.getEstado(), thumbnailBytes,
        noticiaRequest.getDataPublicacao(), anexosBytes, noticiaRequest.getEmDestaque());
        
        noticiaRepositorio.save(noticia);        
        
        return new NoticiaResponseDTO(noticia.getId(), noticia.getTitulo(), noticia.getDescricao(), noticia.getAutor(),
         noticia.getConteudo(), noticia.getEstado(), noticia.getThumbnail(), noticia.getDataPublicacao(), noticia.getAnexosPdf(), noticia.getEmDestaque());
    }
}
