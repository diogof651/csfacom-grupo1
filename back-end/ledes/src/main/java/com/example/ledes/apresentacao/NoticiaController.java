package com.example.ledes.apresentacao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.ledes.aplicacao.noticia.AdicionarNoticiaServico;
import com.example.ledes.aplicacao.noticia.EditarNoticiaServico;
import com.example.ledes.infraestrutura.dto.NoticiaRequestDTO;
import com.example.ledes.infraestrutura.dto.NoticiaResponseDTO;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;

@RestController
@RequestMapping("api/v1/noticias")
public class NoticiaController {
    @Autowired
    private AdicionarNoticiaServico adicionarNoticia;
    @Autowired
    private EditarNoticiaServico editarNoticia;

    @Operation(summary = "Adicionar uma Notícia")
    @ApiResponse(responseCode = "201")
    @PostMapping(consumes = "application/json")
    public ResponseEntity<NoticiaResponseDTO> adicionarNoticia(@RequestBody NoticiaRequestDTO noticiaDTO){
        NoticiaResponseDTO novaNoticia = adicionarNoticia.adicionar(noticiaDTO);
        return new ResponseEntity<NoticiaResponseDTO>(novaNoticia, HttpStatus.CREATED);
    }

    @Operation(summary = "Editar uma Notícia")
    @ApiResponse(responseCode = "200", description = "Retorna os dados atualizados")
    @ApiResponse(responseCode = "404", description = "Noticia não encontrada")
    @PutMapping(path = "/{id}", consumes = "application/json")
    public ResponseEntity<NoticiaResponseDTO> editarNoticia(
        @PathVariable Long id, @RequestBody NoticiaRequestDTO atualiacapDTO){
            NoticiaResponseDTO noticiaEditada = editarNoticia.editar(id, atualiacapDTO);
            return ResponseEntity.ok(noticiaEditada);
        }

}
