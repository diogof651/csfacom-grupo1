package com.example.ledes.aplicacao.noticia;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.ledes.dominio.Anexo;
import com.example.ledes.dominio.Noticia;
import com.example.ledes.dominio.Usuario;
import com.example.ledes.infraestrutura.AnexoRepositorio;
import com.example.ledes.infraestrutura.NoticiaRepositorio;
import com.example.ledes.infraestrutura.UsuarioRepositorio;
import com.example.ledes.infraestrutura.dto.AnexoDTO;
import com.example.ledes.infraestrutura.dto.NoticiaRequestDTO;
import com.example.ledes.infraestrutura.dto.NoticiaResponseDTO;

@Service
public class AdicionarNoticiaServico {
    @Autowired
    private NoticiaRepositorio noticiaRepositorio;

    @Autowired
    private AnexoRepositorio anexoRepositorio;
    @Autowired
    private UsuarioRepositorio usuarioRepositorio;

    public NoticiaResponseDTO adicionar(NoticiaRequestDTO noticiaRequest) {

        definirDataDePublicacao(noticiaRequest);
        Usuario autor = usuarioRepositorio.findById(noticiaRequest.getAutor_id()).get();

        Noticia noticia = new Noticia(noticiaRequest.getTitulo(),
                autor,
                noticiaRequest.getConteudo(), noticiaRequest.getEstado(), noticiaRequest.getEmDestaque(),
                noticiaRequest.getDataPublicacao());
        if (noticiaRequest.getThumbnail() != null) {
            noticia.setThumbnail(noticiaRequest.getThumbnail());
        }
        noticiaRepositorio.save(noticia);

        if (!noticiaRequest.getAnexos().isEmpty() || noticiaRequest.getAnexos() != null) {
            vincularAnexos(noticia, noticiaRequest.getAnexos());
        }
        Collection<Anexo> anexosVinculados = anexoRepositorio.findByNoticia(noticia);
        Collection<AnexoDTO> anexosDto = new ArrayList<AnexoDTO>();
        for (Anexo anexo : anexosVinculados) {
            anexosDto.add(new AnexoDTO(anexo.getId(), anexo.getTitulo(), anexo.getConteudo()));
        }

        return new NoticiaResponseDTO(noticia.getId(), noticia.getTitulo(), noticia.getAutor(),
                noticia.getConteudo(), noticia.getEstado(), noticia.getThumbnail(), noticia.getDataPublicacao(),
                noticia.getEmDestaque(), anexosDto);
    }

    private void vincularAnexos(Noticia noticia, Collection<AnexoDTO> anexos) {
        for (AnexoDTO anexoDto : anexos) {
            Anexo anexo = new Anexo(anexoDto.getTitulo(), anexoDto.getConteudo(), noticia);
            anexoRepositorio.save(anexo);
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
}
