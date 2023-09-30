package com.example.ledes.apresentacao;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.ledes.aplicacao.noticia.AdicionarNoticiaServico;
import com.example.ledes.aplicacao.noticia.ArquivarNoticiaServico;
import com.example.ledes.aplicacao.noticia.EditarNoticiaServico;
import com.example.ledes.aplicacao.noticia.ListagemNoticiaServico;
import com.example.ledes.dominio.Usuario;
import com.example.ledes.infraestrutura.dto.NoticiaListagemResponseDTO;
import com.example.ledes.infraestrutura.dto.NoticiaRequestDTO;
import com.example.ledes.infraestrutura.dto.NoticiaResponseDTO;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;

@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping("api/v1/noticias")
public class NoticiaController {
    @Autowired
    private AdicionarNoticiaServico adicionarNoticia;
    @Autowired
    private EditarNoticiaServico editarNoticia;
    @Autowired
    private ArquivarNoticiaServico arquivarNoticia;
    @Autowired
    private ListagemNoticiaServico listagemNoticiaServico;

    @Operation(summary = "Adicionar uma Notícia")
    @ApiResponse(responseCode = "201")
    @PostMapping(consumes = "application/json")
    public ResponseEntity<NoticiaResponseDTO> adicionarNoticia(@RequestBody NoticiaRequestDTO noticiaDTO) {
        NoticiaResponseDTO novaNoticia = adicionarNoticia.adicionar(noticiaDTO);
        return new ResponseEntity<NoticiaResponseDTO>(novaNoticia, HttpStatus.CREATED);
    }

    @Operation(summary = "Editar uma Notícia")
    @ApiResponse(responseCode = "200", description = "Retorna os dados atualizados")
    @ApiResponse(responseCode = "404", description = "Noticia não encontrada")
    @PutMapping(path = "/{id}", consumes = "application/json")
    public ResponseEntity<NoticiaResponseDTO> editarNoticia(
            @PathVariable Long id, @RequestBody NoticiaRequestDTO atualiacapDTO) {
        NoticiaResponseDTO noticiaEditada = editarNoticia.editar(id, atualiacapDTO);

        if (noticiaEditada != null) {
            return ResponseEntity.ok(noticiaEditada);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @Operation(summary = "Arquivar uma noticia")
    @ApiResponse(responseCode = "200", description = "Retorna os dados atualizados")
    @ApiResponse(responseCode = "404", description = "Noticia não encontrada")
    @PutMapping(path = "/{id}/arquivar", consumes = "application/json")
    public ResponseEntity<NoticiaResponseDTO> arquivarNoticia(@PathVariable Long id) {
        NoticiaResponseDTO noticiaArquivada = arquivarNoticia.arquivar(id);

        if (noticiaArquivada != null) {
            return ResponseEntity.ok(noticiaArquivada);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @Operation(summary = "Listagem de Noticia")
    @ApiResponse(responseCode = "200", description = "Retorna as noticias filtradas por aba, titulo, autor e data publicação")
    @ApiResponse(responseCode = "404", description = "Noticias não encontrada")
    @GetMapping()
    public ResponseEntity<List<NoticiaListagemResponseDTO>> listagemNoticia(
            @RequestParam(name = "titulo", required = false) String titulo,
            @RequestParam(name = "usuario", required = false) Usuario usuario,
            @RequestParam(name = "data", required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) Date dataPublicacao,
            @RequestParam(name = "estado", required = false) String estado) 
            {

        List<NoticiaListagemResponseDTO> noticiasEncontradas = listagemNoticiaServico
                .buscarNoticiasPorParametros(titulo, usuario, dataPublicacao, estado);

        if (noticiasEncontradas != null) {
            return ResponseEntity.ok(noticiasEncontradas);
        }
        return ResponseEntity.notFound().build();

    }

}
