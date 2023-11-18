package com.example.ledes.aplicacao.noticia;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.ledes.dominio.Noticia;
import com.example.ledes.dominio.Usuario;
import com.example.ledes.infraestrutura.NoticiaRepositorio;
import com.example.ledes.infraestrutura.UsuarioRepositorio;
import com.example.ledes.infraestrutura.dto.NoticiaListagemResponseDTO;

@Service
public class ListagemNoticiaServico {

    @Autowired
    private NoticiaRepositorio noticiaRepositorio;
    @Autowired
    private UsuarioRepositorio usuarioRepositorio;

    public List<NoticiaListagemResponseDTO> buscarNoticiasPorParametros(
            String titulo, String nomeAutor, String dataPublicacao, String estado, String hash) throws ParseException {

        List<Noticia> noticiasFiltradasPorEstado = obterNoticiasFiltradasPorEstado(estado, hash);
        List<Noticia> noticiasFiltradasPorDataPublicacao;
        List<Noticia> noticiasFiltradasPorTitulo;
        List<Noticia> noticiasFiltradasPorAutor;

        if (nomeAutor != null && !nomeAutor.isEmpty() && !nomeAutor.isBlank()) {
            Usuario autor = usuarioRepositorio.findByNome(nomeAutor);
            noticiasFiltradasPorAutor = noticiaRepositorio.findByAutor(autor);
            noticiasFiltradasPorEstado.retainAll(noticiasFiltradasPorAutor);
        }

        if (titulo != null && !titulo.isEmpty() && !titulo.isBlank()) {
            noticiasFiltradasPorTitulo = noticiaRepositorio.findByTituloContaining(titulo);
            noticiasFiltradasPorEstado.retainAll(noticiasFiltradasPorTitulo);
        }

        if (dataPublicacao != null && !dataPublicacao.isEmpty() && !dataPublicacao.isBlank()
                && !dataPublicacao.equals("null")) {
            Date dataPublicacaoFormatada = new SimpleDateFormat("yyyy-MM-dd").parse(dataPublicacao);
            noticiasFiltradasPorDataPublicacao = noticiaRepositorio
                    .findByDataPublicacao(dataPublicacaoFormatada);
            noticiasFiltradasPorEstado.retainAll(noticiasFiltradasPorDataPublicacao);
        }

        Stream<Noticia> noticiaStream = noticiasFiltradasPorEstado.stream();

        List<NoticiaListagemResponseDTO> noticiasListagemResponseDTO = noticiaStream
                .map(this::converterParaDTO)
                .collect(Collectors.toList());

        return noticiasListagemResponseDTO;
    }

    private List<Noticia> obterNoticiasFiltradasPorEstado(String estado, String hash) {
        Optional<Usuario> usuario = usuarioRepositorio.findByCodigoHash(hash);
        if (usuario.isPresent()
                && (!usuario.get().possuiPermissao("ADMIN") || !usuario.get().possuiPermissao("EDITORNOTICIA"))) {
            estado = null;
        }

        List<Noticia> noticiasFiltradasPorEstado = new ArrayList<Noticia>();
        Date dataAtual = new Date();
        if (estado != null && !estado.isEmpty() && !estado.isBlank()) {
            if ("Publicada".equals(estado)) {
                List<Noticia> noticiasImediatas = noticiaRepositorio.findByEstado("Imediata");
                noticiasFiltradasPorEstado.addAll(noticiasImediatas);
                List<Noticia> noticiasAgendadasPublicadas = noticiaRepositorio
                        .findByEstadoAndDataPublicacaoLessThanEqual("Agendada", dataAtual);
                noticiasFiltradasPorEstado.addAll(noticiasAgendadasPublicadas);
            } else if ("Agendada".equals(estado)) {
                List<Noticia> noticiasAgendadas = noticiaRepositorio
                        .findByEstadoAndDataPublicacaoGreaterThan("Agendada", dataAtual);

                noticiasFiltradasPorEstado.addAll(noticiasAgendadas);
            } else if ("Rascunho".equals(estado)) {
                List<Noticia> noticiasRetornadas = noticiaRepositorio.findByEstado("Rascunho");
                noticiasFiltradasPorEstado.addAll(noticiasRetornadas);

            } else if ("Arquivada".equals(estado)) {
                List<Noticia> noticiasRetornadas = noticiaRepositorio.findByEstado("Arquivada");
                noticiasFiltradasPorEstado.addAll(noticiasRetornadas);
            } else if ("Destaque".equals(estado)) {
                List<Noticia> noticiasRetornadas = noticiaRepositorio.findByEmDestaqueTrue();
                noticiasFiltradasPorEstado.addAll(noticiasRetornadas);
            }
        }
        return noticiasFiltradasPorEstado;
    }

    private NoticiaListagemResponseDTO converterParaDTO(Noticia noticia) {
        return new NoticiaListagemResponseDTO(
                noticia.getId(),
                noticia.getTitulo(),
                noticia.getAutor(),
                noticia.getEstado(),
                noticia.getThumbnail(),
                noticia.getDataPublicacao(),
                noticia.getEmDestaque());
    }

}
