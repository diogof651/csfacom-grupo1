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
import org.springframework.web.bind.annotation.RestController;

import com.example.ledes.aplicacao.tipovinculo.AtivarTipoVinculoServico;
import com.example.ledes.aplicacao.tipovinculo.AdicionarTipoVinculoServico;
import com.example.ledes.aplicacao.tipovinculo.AtualizarTipoVinculoServico;
import com.example.ledes.aplicacao.tipovinculo.DesativarTipoVinculoServico;
import com.example.ledes.aplicacao.tipovinculo.ListagemTipoVinculoAtivoServico;
import com.example.ledes.aplicacao.tipovinculo.ListagemTipoVinculoServico;
import com.example.ledes.infraestrutura.dto.TipoVinculoRequestDTO;
import com.example.ledes.infraestrutura.dto.TipoVinculoResponseDTO;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;

@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping(path = { "/api/v1/tipoprojetos" }, produces = { "application/json" })
public class TipoVinculoController {
    @Autowired
    private AdicionarTipoVinculoServico adicionarTipoVinculoServico;
    @Autowired
    private AtualizarTipoVinculoServico atualizarTipoVinculoServico;
    @Autowired
    private DesativarTipoVinculoServico desativarTipoVinculoServico;
    @Autowired
    private ListagemTipoVinculoServico listagemTipoVinculoServico;
    @Autowired
    private AtivarTipoVinculoServico ativarTipoVinculoServico;
    @Autowired
    private ListagemTipoVinculoAtivoServico listagemTipoVinculoAtivoServico;

    @Operation(summary = "Criar um novo tipo de vinculo")
    @ApiResponse(responseCode = "201")
    @PostMapping(consumes = { "application/json" })
    public ResponseEntity<TipoVinculoResponseDTO> criarTipoProjeto(@RequestBody TipoVinculoRequestDTO novoTipoVinculo) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(adicionarTipoVinculoServico.adicionar(novoTipoVinculo));
    }

    @Operation(summary = "Atualizar tipo do vinculo")
    @ApiResponse(responseCode = "200", description = "Retorna os dados atualizados")
    @ApiResponse(responseCode = "404", description = "Tipo do vinculo não encontrado")
    @PutMapping(path = "/{id}", consumes = "application/json")
    public ResponseEntity<TipoVinculoResponseDTO> atualizarTipoVinculo(
            @RequestBody TipoVinculoRequestDTO tipoVinculoRequestDTO, @PathVariable Long id) {
        TipoVinculoResponseDTO tipoVinculoAtualizado = atualizarTipoVinculoServico.atualizar(id, tipoVinculoRequestDTO);

        if (tipoVinculoAtualizado != null) {
            return ResponseEntity.ok(tipoVinculoAtualizado);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @Operation(summary = "Listar Tipos de Vinculos")
    @ApiResponse(responseCode = "200", description = "Retorna a listagem de tipos vinculos")
    @GetMapping("/listagem")
    public ResponseEntity<List<TipoVinculoResponseDTO>> buscarTipoVinculos() {
        List<TipoVinculoResponseDTO> tipoVinculosEncontrados = listagemTipoVinculoServico.listarTiposVinculos();
        if (tipoVinculosEncontrados != null) {
            return ResponseEntity.ok(tipoVinculosEncontrados);
        }
        return ResponseEntity.notFound().build();
    }

    @Operation(summary = "Desativar um tipo de vinculo")
    @ApiResponse(responseCode = "200", description = "Retorna os dados do tipo de vinculo desativado")
    @ApiResponse(responseCode = "404", description = "Tipo de vinculo não encontrado")
    @PostMapping(path = "/{id}/desativar")
    public ResponseEntity<TipoVinculoResponseDTO> desativarTipoVinculo(@PathVariable Long id) {
        TipoVinculoResponseDTO tipoVinculoDesativado = desativarTipoVinculoServico.desativar(id);

        if (tipoVinculoDesativado != null) {
            return ResponseEntity.ok(tipoVinculoDesativado);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    /*
    @Operation(summary = "Buscar tipo de projeto por ID")
    @ApiResponse(responseCode = "200", description = "Retorna os dados do projeto referente ao ID")
    @ApiResponse(responseCode = "404", description = "Id não encontrado")
    @GetMapping("/{id}")
    public ResponseEntity<TipoProjetoResponseDTO> obterTipoProjetoId(@PathVariable Long id) {
        TipoProjetoResponseDTO tipoProjetoEncontrado = buscarTipoProjetoIdServico.buscarPorId(id);

        if (tipoProjetoEncontrado != null) {
            return ResponseEntity.ok(tipoProjetoEncontrado);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    */

    @Operation(summary = "Ativar um tipo de vinculo")
    @ApiResponse(responseCode = "200", description = "Retorna os dados do tipo de vinculo ativado")
    @ApiResponse(responseCode = "404", description = "Tipo de vinculo não encontrado")
    @PostMapping(path = "/{id}/ativar")
    public ResponseEntity<TipoVinculoResponseDTO> ativarTipoVinculo(@PathVariable Long id) {
        TipoVinculoResponseDTO tipoVinculoAtivado = ativarTipoVinculoServico.ativar(id);

        if (tipoVinculoAtivado != null) {
            return ResponseEntity.ok(tipoVinculoAtivado);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @Operation(summary = "Listar Tipos de Vinculos Ativos")
    @ApiResponse(responseCode = "200", description = "Retorna a listagem de tipos vinculos ativos")
    @GetMapping("/listagem/ativos")
    public ResponseEntity<List<TipoVinculoResponseDTO>> buscarTipoVinculosAtivos() {
        List<TipoVinculoResponseDTO> tipoVinculosEncontrados = listagemTipoVinculoAtivoServico.listarTiposVinculosAtivos();
        if (tipoVinculosEncontrados != null) {
            return ResponseEntity.ok(tipoVinculosEncontrados);
        }
        return ResponseEntity.notFound().build();
    }
    

}