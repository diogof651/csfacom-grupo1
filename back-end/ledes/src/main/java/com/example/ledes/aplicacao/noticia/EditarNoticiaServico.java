package com.example.ledes.aplicacao.noticia;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.ledes.dominio.Anexo;
import com.example.ledes.dominio.Noticia;
import com.example.ledes.infraestrutura.AnexoRepositorio;
import com.example.ledes.infraestrutura.NoticiaRepositorio;
import com.example.ledes.infraestrutura.dto.AnexoDTO;
import com.example.ledes.infraestrutura.dto.NoticiaRequestDTO;
import com.example.ledes.infraestrutura.dto.NoticiaResponseDTO;

@Service
public class EditarNoticiaServico {
    @Autowired
    private NoticiaRepositorio noticiaRepositorio;

    @Autowired
    private AnexoRepositorio anexoRepositorio;

    public NoticiaResponseDTO editar(Long id, NoticiaRequestDTO noticiaRequest) {

        Noticia noticia = noticiaRepositorio.findById(id).orElse(null);

        if (noticia != null) {
            definirDataDePublicacao(noticiaRequest);
            noticia.setTitulo(noticiaRequest.getTitulo());
            noticia.setDescricao(noticiaRequest.getDescricao());
            noticia.setAutor(noticiaRequest.getAutor());
            noticia.setConteudo(noticiaRequest.getConteudo());
            noticia.setEstado(noticiaRequest.getEstado());
            noticia.setThumbnail(noticiaRequest.getThumbnail());
            noticiaRepositorio.save(noticia);

            if (!noticiaRequest.getAnexos().isEmpty() || noticiaRequest.getAnexos() != null) {
                vincularAnexos(noticia, noticiaRequest.getAnexos());
            }

            Collection<Anexo> anexosVinculados = anexoRepositorio.findByNoticia(noticia);
            Collection<AnexoDTO> anexosDto = new ArrayList<AnexoDTO>();
            for (Anexo anexo : anexosVinculados) {
                anexosDto.add(new AnexoDTO(anexo.getId(), anexo.getTitulo(), anexo.getConteudo()));
            }

            return new NoticiaResponseDTO(noticia.getId(), noticia.getTitulo(), noticia.getDescricao(),
                    noticia.getAutor(),
                    noticia.getConteudo(), noticia.getEstado(), noticia.getThumbnail(), noticia.getDataPublicacao(),
                    noticia.getEmDestaque(), anexosDto);
        } else {
            return null;
        }
    }

    private void definirDataDePublicacao(NoticiaRequestDTO noticiaRequest) {
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
    }

    private void vincularAnexos(Noticia noticia, Collection<AnexoDTO> anexos) {
        Collection<Long> ids = new ArrayList<Long>();
        Anexo anexo;
        for (AnexoDTO anexoDTO : anexos) {
            if (anexoDTO.getId() == null) {
                anexo = new Anexo(anexoDTO.getTitulo(), anexoDTO.getConteudo(), noticia);
            } else {
                anexo = anexoRepositorio.findById(anexoDTO.getId()).get();
                anexo.setTitulo(anexoDTO.getTitulo());
                anexo.setConteudo(anexoDTO.getConteudo());
                ids.add(anexoDTO.getId());
            }
            anexoRepositorio.save(anexo);
        }

        Collection<Anexo> anexosVinculados = anexoRepositorio.findByNoticia(noticia);
        for (Anexo anexoVinculado : anexosVinculados) {
            if (!ids.contains(anexoVinculado.getId())) {
                anexoRepositorio.delete(anexoVinculado);
            }
        }
    }
}