package com.example.ledes.apresentacao;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
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

import com.example.ledes.aplicacao.projeto.AdicionarProjetoServico;
import com.example.ledes.aplicacao.projeto.AtualizarProjetoServico;
import com.example.ledes.aplicacao.projeto.BuscaProjetoPorParametroServico;
import com.example.ledes.aplicacao.projeto.DesativarProjetoServico;
import com.example.ledes.aplicacao.projeto.ListagemProjetoIdServico;
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
    @Autowired
    private BuscaProjetoPorParametroServico buscaProjetoPorParametroServico;
    @Autowired
    private ListagemProjetoIdServico listagemProjetoIdServico;

    @Operation(summary = "Criar um novo projeto")
    @ApiResponse(responseCode = "201")
    @PostMapping(consumes = { "application/json" })
    public ResponseEntity<ProjetoResponseDTO> criarProjeto(@RequestBody ProjetoRequestDTO novoProjeto) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(adicionarProjetoServico.adicionar(novoProjeto));
    }

    @Operation(summary = "Atualizar um projeto")
    @ApiResponse(responseCode = "200", description = "Retorna os dados atualizados")
    @ApiResponse(responseCode = "404", description = "Projeto não encontrado")
    @PutMapping(path = "/{id}", consumes = "application/json")
    public ResponseEntity<ProjetoResponseDTO> atualizarProjeto(
            @RequestBody ProjetoRequestDTO projetoRequestDTO, @PathVariable Long id) {
        ProjetoResponseDTO projetoAtualizado = atualizarProjetoServico.atualizar(id, projetoRequestDTO);

        if (projetoAtualizado != null) {
            return ResponseEntity.ok(projetoAtualizado);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @Operation(summary = "Desativar um projeto")
    @ApiResponse(responseCode = "200", description = "Retorna os dados do projeto desativado")
    @ApiResponse(responseCode = "404", description = "Projeto não encontrado")
    @PostMapping(path = "/{id}/desativar", consumes = "application/json")
    public ResponseEntity<ProjetoResponseDTO> desativarProjeto(@PathVariable Long id) {
        ProjetoResponseDTO projetoDesativado = desativarProjetoServico.desativar(id);

        if (projetoDesativado != null) {
            return ResponseEntity.ok(projetoDesativado);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    
    @Operation(summary = "Listar Projetos")
    @ApiResponse(responseCode = "200", description = "Retorna a listagem de projetos")
    @GetMapping("/listagem")
    public ResponseEntity<List<ProjetoResponseDTO>> buscarProjetosPorParametros(
            @RequestParam(name = "tipo", required = false) String tipo,
            @RequestParam(name = "status", required = false) String status,
            @RequestParam(name = "nome", required = false) String nome) {

        List<ProjetoResponseDTO> projetosEncontrados = buscaProjetoPorParametroServico.buscarProjetosPorParametros(tipo,
                status, nome);

        if (projetosEncontrados != null) {
            return ResponseEntity.ok(projetosEncontrados);
        }
        return ResponseEntity.notFound().build();
    }

    @Operation(summary = "Buscar projeto por ID")
    @ApiResponse(responseCode = "200", description = "Retorna os dados do projeto referente ao ID")
    @ApiResponse(responseCode = "404", description = "Id não encontrado")
    @GetMapping("/{id}")
    public ResponseEntity<ProjetoResponseDTO> obterProjetoId(@PathVariable Long id) {
        ProjetoResponseDTO projetoEncontrado = listagemProjetoIdServico.buscarPorId(id);

        if (projetoEncontrado != null) {
            return ResponseEntity.ok(projetoEncontrado);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

}
