package com.example.ledes.aplicacao.noticia;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.ledes.dominio.Anexo;
import com.example.ledes.dominio.Noticia;
import com.example.ledes.dominio.Usuario;
import com.example.ledes.infraestrutura.AnexoRepositorio;
import com.example.ledes.infraestrutura.NoticiaRepositorio;
import com.example.ledes.infraestrutura.UsuarioRepositorio;
import com.example.ledes.infraestrutura.dto.AnexoDTO;
import com.example.ledes.infraestrutura.dto.NoticiaResponseDTO;

@Service
public class ArquivarNoticiaServico {
    @Autowired
    private NoticiaRepositorio noticiaRepositorio;

    @Autowired
    private AnexoRepositorio anexoRepositorio;
    @Autowired
    private UsuarioRepositorio usuarioRepositorio;

    public NoticiaResponseDTO arquivar(Long id, String hash) {

        Noticia noticia = noticiaRepositorio.findById(id).orElse(null);
        Optional<Usuario> usuario = usuarioRepositorio.findByCodigoHash(hash);

        if (usuario.isPresent()) {
            if (usuario.get().possuiPermissao("ADMIN") || usuario.get().possuiPermissao("EDITORNOTICIA")) {
                if (noticia != null) {

                    noticia.setEstado("Arquivada");
                    noticiaRepositorio.save(noticia);

                    Collection<Anexo> anexosVinculados = anexoRepositorio.findByNoticia(noticia);
                    Collection<AnexoDTO> anexosDto = new ArrayList<AnexoDTO>();
                    for (Anexo anexo : anexosVinculados) {
                        anexosDto.add(new AnexoDTO(anexo.getId(), anexo.getTitulo(), anexo.getConteudo()));
                    }

                    return new NoticiaResponseDTO(noticia.getId(), noticia.getTitulo(),
                            noticia.getAutor(),
                            noticia.getConteudo(), noticia.getEstado(), noticia.getThumbnail(),
                            noticia.getDataPublicacao(),
                            noticia.getEmDestaque(), anexosDto);
                } else {
                    return null;
                }
            }
        }
        return null;
    }
}
