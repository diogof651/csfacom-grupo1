package com.example.ledes.aplicacao.noticia;

import java.util.Collection;
import java.util.Optional;
import java.util.stream.Collectors; // Importe a classe Collectors

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.example.ledes.dominio.Noticia;
import com.example.ledes.dominio.Usuario;
import com.example.ledes.infraestrutura.AnexoRepositorio;
import com.example.ledes.infraestrutura.NoticiaRepositorio;
import com.example.ledes.infraestrutura.UsuarioRepositorio;
import com.example.ledes.infraestrutura.dto.AnexoDTO;
import com.example.ledes.infraestrutura.dto.NoticiaResponseDTO;

@Service
public class ObterNoticiaPorIdServico {

        @Autowired
        private NoticiaRepositorio noticiaRepositorio;

        @Autowired
        private AnexoRepositorio anexoRepositorio;
        @Autowired
        private UsuarioRepositorio usuarioRepositorio;

        public NoticiaResponseDTO obterNoticiaPorId(Long id, String hash) {
                Noticia noticia = noticiaRepositorio.findById(id)
                                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND,
                                                "Notícia não encontrada"));

                Optional<Usuario> usuario = usuarioRepositorio.findByCodigoHash(hash);
                if (usuario.isPresent()) {
                        if (usuario.get().possuiPermissao("ADMIN") || usuario.get().possuiPermissao("EDITORNOTICIA")) {
                                // Use a classe Collectors para mapear os objetos Anexo para AnexoDTO
                                Collection<AnexoDTO> anexos = anexoRepositorio.findByNoticia(noticia)
                                                .stream()
                                                .map(anexo -> new AnexoDTO(anexo.getId(), anexo.getTitulo(),
                                                                anexo.getConteudo()))
                                                .collect(Collectors.toList());

                                return new NoticiaResponseDTO(
                                                noticia.getId(),
                                                noticia.getTitulo(),
                                                noticia.getAutor(),
                                                noticia.getConteudo(),
                                                noticia.getEstado(),
                                                noticia.getThumbnail(),
                                                noticia.getDataPublicacao(),
                                                noticia.getEmDestaque(),
                                                anexos);
                        }
                }
                return null;
        }
}
