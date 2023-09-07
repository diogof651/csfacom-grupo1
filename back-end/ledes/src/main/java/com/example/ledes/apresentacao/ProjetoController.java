package com.example.ledes.apresentacao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.ledes.aplicacao.AdicionarProjetoServico;
import com.example.ledes.infraestrutura.dto.ProjetoRequestDTO;
import com.example.ledes.infraestrutura.dto.ProjetoResponseDTO;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;

@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping(path = { "/api/v1/projetos" }, produces = { "application/json" })
public class ProjetoController {
    @Autowired
    private AdicionarProjetoServico adicionarProjetoServico;

    @Operation(summary = "Criar um novo projeto")
    @ApiResponse(responseCode = "201")
    @PostMapping(consumes = { "application/json" })
    public ResponseEntity<ProjetoResponseDTO> criarTipo(@RequestBody ProjetoRequestDTO novoProjeto) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(adicionarProjetoServico.adicionar(novoProjeto));
    }
}
