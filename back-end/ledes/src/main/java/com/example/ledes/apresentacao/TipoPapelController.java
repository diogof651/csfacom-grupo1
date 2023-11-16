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
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.ledes.aplicacao.tipopapel.AdicionarTipoPapelServico;
import com.example.ledes.aplicacao.tipopapel.AtivarTipoPapelServico;
import com.example.ledes.aplicacao.tipopapel.AtualizarTipoPapelServico;
import com.example.ledes.aplicacao.tipopapel.DesativarTipoPapelServico;
import com.example.ledes.aplicacao.tipopapel.ListagemTipoPapelAtivoServico;
import com.example.ledes.aplicacao.tipopapel.ListagemTipoPapelServico;
import com.example.ledes.infraestrutura.dto.TipoPapelRequestDTO;
import com.example.ledes.infraestrutura.dto.TipoPapelResponseDTO;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.parameters.RequestBody;
import io.swagger.v3.oas.annotations.responses.ApiResponse;

@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping(path = { "/api/v1/tipoprojetos" }, produces = { "application/json" })
public class TipoPapelController  {
    @Autowired
    private AdicionarTipoPapelServico adicionarTipoPapelServico;
    @Autowired
    private AtualizarTipoPapelServico atualizarTipoPapelServico;
    @Autowired
    private DesativarTipoPapelServico desativarTipoPapelServico;
    @Autowired
    private ListagemTipoPapelServico listagemTipoPapelServico;
    @Autowired
    private AtivarTipoPapelServico ativarTipoPapelServico;
    @Autowired
    private ListagemTipoPapelAtivoServico listagemTipoPapelAtivoServico;

    @Operation(summary = "Criar um novo tipo de papel")
    @ApiResponse(responseCode = "201")
    @PostMapping(consumes = { "application/json" })
    public ResponseEntity<TipoPapelResponseDTO> criarTipoPapel(@RequestBody TipoPapelRequestDTO novoTipoPapel) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(adicionarTipoPapelServico.adicionar(novoTipoPapel));
    }

    @Operation(summary = "Atualizar tipo do papel")
    @ApiResponse(responseCode = "200", description = "Retorna os dados atualizados")
    @ApiResponse(responseCode = "404", description = "Tipo do papel não encontrado")
    @PutMapping(path = "/{id}", consumes = "application/json")
    public ResponseEntity<TipoPapelResponseDTO> atualizarTipoPapel(
            @RequestBody TipoPapelRequestDTO tipoPapelRequestDTO, @PathVariable Long id) {
        TipoPapelResponseDTO tipoPapelAtualizado = atualizarTipoPapelServico.atualizar(id, tipoPapelRequestDTO);

        if (tipoPapelAtualizado != null) {
            return ResponseEntity.ok(tipoPapelAtualizado);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @Operation(summary = "Listar Tipos de papeis")
    @ApiResponse(responseCode = "200", description = "Retorna a listagem de tipos papeis")
    @GetMapping("/listagem")
    public ResponseEntity<List<TipoPapelResponseDTO>> buscarTipoPapeis() {
        List<TipoPapelResponseDTO> tipoPapeisEncontrados = listagemTipoPapelServico.listarTiposPapeis();
        if (tipoPapeisEncontrados != null) {
            return ResponseEntity.ok(tipoPapeisEncontrados);
        }
        return ResponseEntity.notFound().build();
    }

    @Operation(summary = "Desativar um tipo de papel")
    @ApiResponse(responseCode = "200", description = "Retorna os dados do tipo de papel desativado")
    @ApiResponse(responseCode = "404", description = "Tipo de papel não encontrado")
    @PostMapping(path = "/{id}/desativar")
    public ResponseEntity<TipoPapelResponseDTO> desativarTipoPapel(@PathVariable Long id) {
        TipoPapelResponseDTO tipoPapelDesativado = desativarTipoPapelServico.desativar(id);

        if (tipoPapelDesativado != null) {
            return ResponseEntity.ok(tipoPapelDesativado);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @Operation(summary = "Ativar um tipo de Papel")
    @ApiResponse(responseCode = "200", description = "Retorna os dados do tipo de Papel ativado")
    @ApiResponse(responseCode = "404", description = "Tipo de Papel não encontrado")
    @PostMapping(path = "/{id}/ativar")
    public ResponseEntity<TipoPapelResponseDTO> ativarTipoPapel(@PathVariable Long id) {
        TipoPapelResponseDTO tipoPapelAtivado = ativarTipoPapelServico.ativar(id);

        if (tipoPapelAtivado != null) {
            return ResponseEntity.ok(tipoPapelAtivado);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @Operation(summary = "Listar Tipos de Papeis Ativos")
    @ApiResponse(responseCode = "200", description = "Retorna a listagem de tipos Papeis ativos")
    @GetMapping("/listagem/ativos")
    public ResponseEntity<List<TipoPapelResponseDTO>> buscarTipoPapeisAtivos() {
        List<TipoPapelResponseDTO> tipoPapeisEncontrados = listagemTipoPapelAtivoServico.listarTiposPapeisAtivos();
        if (tipoPapeisEncontrados != null) {
            return ResponseEntity.ok(tipoPapeisEncontrados);
        }
        return ResponseEntity.notFound().build();
    }


}
