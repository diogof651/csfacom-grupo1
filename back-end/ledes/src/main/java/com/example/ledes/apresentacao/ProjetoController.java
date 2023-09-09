package com.example.ledes.apresentacao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.ledes.aplicacao.AdicionarProjetoServico;
import com.example.ledes.aplicacao.AtualizarProjetoServico;
import com.example.ledes.aplicacao.DesativarProjetoServico;
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
    @Autowired
    private AtualizarProjetoServico atualizarProjetoServico;
    @Autowired
    private DesativarProjetoServico desativarProjetoServico;

    @Operation(summary = "Criar um novo projeto")
    @ApiResponse(responseCode = "201")
    @PostMapping(consumes = { "application/json" })
    public ResponseEntity<ProjetoResponseDTO> criarTipo(@RequestBody ProjetoRequestDTO novoProjeto) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(adicionarProjetoServico.adicionar(novoProjeto));
    }

    @Operation(summary = "Atualizar um projeto")
    @ApiResponse(responseCode = "200", description = "Retorna os dados atualizados")
    @PutMapping(path = "/{id}", consumes = "application/json")
    public ResponseEntity<ProjetoResponseDTO> atualizarProjeto(
        @RequestBody ProjetoRequestDTO projetoRequestDTO, @PathVariable Long id){
            ProjetoResponseDTO projetoAtualizado = atualizarProjetoServico.atualizar(id, projetoRequestDTO);

            if (projetoAtualizado != null) {
                return ResponseEntity.ok(projetoAtualizado);
            } else {
                return ResponseEntity.notFound().build();
            }
        }

        @Operation(summary = "Desativar um projeto")
        @ApiResponse(responseCode = "200", description = "Retorna os dados do projeto desativado")
        @PostMapping(path = "/{id}/desativar", consumes = "application/json")
        public ResponseEntity<ProjetoResponseDTO> desativarProjeto(@PathVariable Long id) {
        ProjetoResponseDTO projetoDesativado = desativarProjetoServico.desativar(id);

        if (projetoDesativado != null) {
            return ResponseEntity.ok(projetoDesativado);
        } else {
            return ResponseEntity.notFound().build();
        }
}
    
}
