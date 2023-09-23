package com.example.ledes.aplicacao.noticia;

import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.ledes.dominio.Noticia;
import com.example.ledes.infraestrutura.NoticiaRepositorio;
import com.example.ledes.infraestrutura.dto.NoticiaRequestDTO;
import com.example.ledes.infraestrutura.dto.NoticiaResponseDTO;

@Service
public class EditarNoticiaServico {
    @Autowired
    private NoticiaRepositorio noticiaRepositorio;

    public NoticiaResponseDTO editar(Long id, NoticiaRequestDTO noticiaRequest){

        Noticia noticia = noticiaRepositorio.findById(id).orElse(null);

        if(noticia != null){
            noticia.setTitulo(noticiaRequest.getTitulo());
            noticia.setDescricao(noticiaRequest.getDescricao());
            noticia.setAutor(noticiaRequest.getAutor());
            if ("publicacao_imediata".equals(noticiaRequest.getEstado())) {
                // Caso de publicação imediata, definir a data atual
                noticia.setDataPublicacao(new Date());
            } else if ("rascunho".equals(noticiaRequest.getEstado())) {
                // Caso de rascunho, a data deve ser nula
                noticia.setDataPublicacao(null);
            } else if ("agendada".equals(noticiaRequest.getEstado())) {
                // Caso de notícia agendada, verificar a data de agendamento
                Date dataAgendamento = noticiaRequest.getDataPublicacao();
                Date dataAtual = new Date();

                if (dataAgendamento != null && dataAgendamento.after(dataAtual)) {
                    // A data agendada é válida
                    noticia.setDataPublicacao(dataAgendamento);
                } else {
                    // A data agendada não é válida
                    throw new IllegalArgumentException("A data de agendamento deve estar no futuro.");
                }
            }
            noticia.setConteudo(noticiaRequest.getConteudo());
            //aqui também vai ser possivel arquivar uma noticia?
            noticia.setEstado(noticiaRequest.getEstado());
            // Converte o campo 'thumbnail' para um array de bytes
            byte[] thumbnailBytes = noticiaRequest.getThumbnail();
            noticia.setThumbnail(thumbnailBytes);
            noticia.setDataPublicacao(noticiaRequest.getDataPublicacao());
            // Converte o campo 'anexos' para um array de bytes
            byte[] anexosBytes = noticiaRequest.getAnexos();
            noticia.setAnexosPdf(anexosBytes);

            noticiaRepositorio.save(noticia);

            return new NoticiaResponseDTO(noticia.getId(), noticia.getTitulo(), noticia.getDescricao(), noticia.getAutor(),
            noticia.getConteudo(), noticia.getEstado(), noticia.getThumbnail(), noticia.getDataPublicacao(), noticia.getAnexosPdf(), noticia.getEmDestaque());
        } else{
            return null;
        }
    }
}
