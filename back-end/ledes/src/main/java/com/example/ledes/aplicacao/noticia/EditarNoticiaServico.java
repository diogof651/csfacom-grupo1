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
                noticia.setData(new Date());
            } else if ("rascunho".equals(noticiaRequest.getEstado())) {
                // Caso de rascunho, a data deve ser nula
                noticia.setData(null);
            } else if ("agendada".equals(noticiaRequest.getEstado())) {
                // Caso de notícia agendada, verificar a data de agendamento
                Date dataAgendamento = noticiaRequest.getDataPublicacao();
                Date dataAtual = new Date();

                if (dataAgendamento != null && dataAgendamento.after(dataAtual)) {
                    // A data agendada é válida
                    noticia.setData(dataAgendamento);
                } else {
                    // A data agendada não é válida
                    throw new IllegalArgumentException("A data de agendamento deve estar no futuro.");
                }
            }
            noticia.setData(noticiaRequest.getData());
            noticia.setConteudo(noticiaRequest.getConteudo());
            //aqui também vai ser possivel arquivar uma noticia?
            noticia.setEstado(noticiaRequest.getEstado());
            noticia.setThumbnail(noticiaRequest.getThumbnail());
            noticia.setDataPublicacao(noticiaRequest.getDataPublicacao());
            noticia.setAnexosPdf(noticiaRequest.getAnexos());

            noticiaRepositorio.save(noticia);

            return new NoticiaResponseDTO(noticia.getId(), noticia.getTitulo(), noticia.getDescricao(), noticia.getAutor(), noticia.getData(),
            noticia.getConteudo(), noticia.getEstado(), noticia.getThumbnail(), noticia.getDataPublicacao(), noticia.getAnexosPdf(), noticia.getEmDestaque());
        } else{
            return null;
        }
    }
}
