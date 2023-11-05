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

import com.example.ledes.aplicacao.tipoprojeto.AdicionarTipoProjetoServico;
import com.example.ledes.aplicacao.tipoprojeto.AtivarTipoProjetoServico;
import com.example.ledes.aplicacao.tipoprojeto.AtualizarTipoProjetoServico;
import com.example.ledes.aplicacao.tipoprojeto.BuscarTipoProjetoIdServico;
import com.example.ledes.aplicacao.tipoprojeto.DesativarTipoProjetoServico;
import com.example.ledes.aplicacao.tipoprojeto.ListagemTipoProjetoAtivoServico;
import com.example.ledes.aplicacao.tipoprojeto.ListagemTipoProjetoServico;
import com.example.ledes.infraestrutura.dto.TipoProjetoRequestDTO;
import com.example.ledes.infraestrutura.dto.TipoProjetoResponseDTO;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;

@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping(path = { "/api/v1/tipoprojetos" }, produces = { "application/json" })
public class TipoProjetoController {
    @Autowired
    private AdicionarTipoProjetoServico adicionarTipoProjetoServico;
    @Autowired
    private AtualizarTipoProjetoServico atualizarTipoProjetoServico;
    @Autowired
    private DesativarTipoProjetoServico desativarTipoProjetoServico;
    @Autowired
    private ListagemTipoProjetoServico listagemTipoProjetoServico;
    @Autowired
    private BuscarTipoProjetoIdServico buscarTipoProjetoIdServico;
    @Autowired
    private AtivarTipoProjetoServico ativarTipoProjetoServico;
    @Autowired
    private ListagemTipoProjetoAtivoServico listagemTipoProjetoAtivoServico;

    @Operation(summary = "Criar um novo tipo de projeto")
    @ApiResponse(responseCode = "201")
    @PostMapping(consumes = { "application/json" })
    public ResponseEntity<TipoProjetoResponseDTO> criarTipoProjeto(@RequestBody TipoProjetoRequestDTO novoTipoProjeto) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(adicionarTipoProjetoServico.adicionar(novoTipoProjeto));
    }

    @Operation(summary = "Atualizar tipo do projeto")
    @ApiResponse(responseCode = "200", description = "Retorna os dados atualizados")
    @ApiResponse(responseCode = "404", description = "Tipo do projeto não encontrado")
    @PutMapping(path = "/{id}", consumes = "application/json")
    public ResponseEntity<TipoProjetoResponseDTO> atualizarTipoProjeto(
            @RequestBody TipoProjetoRequestDTO tipoProjetoRequestDTO, @PathVariable Long id) {
        TipoProjetoResponseDTO tipoProjetoAtualizado = atualizarTipoProjetoServico.atualizar(id, tipoProjetoRequestDTO);

        if (tipoProjetoAtualizado != null) {
            return ResponseEntity.ok(tipoProjetoAtualizado);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @Operation(summary = "Listar Tipos de Projetos")
    @ApiResponse(responseCode = "200", description = "Retorna a listagem de tipos projetos")
    @GetMapping("/listagem")
    public ResponseEntity<List<TipoProjetoResponseDTO>> buscarTipoProjetos() {
        List<TipoProjetoResponseDTO> tipoProjetosEncontrados = listagemTipoProjetoServico.listarTiposProjetos();
        if (tipoProjetosEncontrados != null) {
            return ResponseEntity.ok(tipoProjetosEncontrados);
        }
        return ResponseEntity.notFound().build();
    }

    @Operation(summary = "Desativar um tipo de projeto")
    @ApiResponse(responseCode = "200", description = "Retorna os dados do tipo de projeto desativado")
    @ApiResponse(responseCode = "404", description = "Tipo de projeto não encontrado")
    @PostMapping(path = "/{id}/desativar")
    public ResponseEntity<TipoProjetoResponseDTO> desativarTipoProjeto(@PathVariable Long id) {
        TipoProjetoResponseDTO tipoProjetoDesativado = desativarTipoProjetoServico.desativar(id);

        if (tipoProjetoDesativado != null) {
            return ResponseEntity.ok(tipoProjetoDesativado);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    
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

    @Operation(summary = "Ativar um tipo de projeto")
    @ApiResponse(responseCode = "200", description = "Retorna os dados do tipo de projeto ativado")
    @ApiResponse(responseCode = "404", description = "Tipo de projeto não encontrado")
    @PostMapping(path = "/{id}/ativar")
    public ResponseEntity<TipoProjetoResponseDTO> ativarTipoProjeto(@PathVariable Long id) {
        TipoProjetoResponseDTO tipoProjetoAtivado = ativarTipoProjetoServico.ativar(id);

        if (tipoProjetoAtivado != null) {
            return ResponseEntity.ok(tipoProjetoAtivado);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @Operation(summary = "Listar Tipos de Projetos Ativos")
    @ApiResponse(responseCode = "200", description = "Retorna a listagem de tipos projetos ativos")
    @GetMapping("/listagem/ativos")
    public ResponseEntity<List<TipoProjetoResponseDTO>> buscarTipoProjetosAtivos() {
        List<TipoProjetoResponseDTO> tipoProjetosEncontrados = listagemTipoProjetoAtivoServico.listarTiposProjetosAtivos();
        if (tipoProjetosEncontrados != null) {
            return ResponseEntity.ok(tipoProjetosEncontrados);
        }
        return ResponseEntity.notFound().build();
    }

}
