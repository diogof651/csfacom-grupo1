package com.example.ledes.apresentacao;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.ledes.aplicacao.membro.AtivarMembroServico;
import com.example.ledes.aplicacao.membro.AtualizarMembroServico;
import com.example.ledes.aplicacao.membro.CadastrarMembroServico;
import com.example.ledes.aplicacao.membro.DesativarMembroServico;
import com.example.ledes.aplicacao.membro.ListarMembroServico;
import com.example.ledes.aplicacao.membro.ObterMembroPorIdServico;
import com.example.ledes.aplicacao.membro.RemoverMembroProjetoServico;
import com.example.ledes.infraestrutura.dto.MembroRequestDTO;
import com.example.ledes.infraestrutura.dto.MembroResponseDTO;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;

@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping("/api/v1/membros")
public class MembroController {

    @Autowired
    private CadastrarMembroServico cadastrarMembroServico;
    @Autowired
    private DesativarMembroServico desativarMembroServico;
    @Autowired
    private AtualizarMembroServico atualizarMembroServico;
    @Autowired
    private RemoverMembroProjetoServico removerMembroProjetoServico;
    @Autowired
    private ListarMembroServico listarMembroServico;
    @Autowired
    private ObterMembroPorIdServico obterMembroPorIdServico;
    @Autowired
    private AtivarMembroServico ativarMembroServico;

    @Operation(summary = "Criar um novo membro")
    @ApiResponse(responseCode = "201")
    @PostMapping(path = "projeto/{idProjeto}/cadastrar", consumes = "application/json")
    public ResponseEntity<MembroResponseDTO> cadastrarMembro(@PathVariable Long idProjeto,
            @RequestBody MembroRequestDTO membrorequestDTO) {
        MembroResponseDTO novoMembro = cadastrarMembroServico.adicionar(idProjeto, membrorequestDTO);
        return new ResponseEntity<>(novoMembro, HttpStatus.CREATED);
    }

    @Operation(summary = "Atualizar um membro")
    @ApiResponse(responseCode = "200", description = "Retorna os dados atualizados")
    @ApiResponse(responseCode = "404", description = "Membro não encontrado")
    @PutMapping(path = "/{id}", consumes = "application/json")
    public ResponseEntity<MembroResponseDTO> atualizarMembroServico(
            @PathVariable Long id, @RequestBody MembroRequestDTO atualizacaoDTO) {
        MembroResponseDTO membroAtualizado = atualizarMembroServico.atualizarMembro(id, atualizacaoDTO);
        return ResponseEntity.ok(membroAtualizado);
    }

    @Operation(summary = "Desativar um membro projeto")
    @ApiResponse(responseCode = "200", description = "Retorna os dados do membro desativado")
    @ApiResponse(responseCode = "404", description = "membro não encontrado")
    @PostMapping(path = "/{id}/desativar")
    public ResponseEntity<MembroResponseDTO> desativarMembro(@PathVariable Long id) {
        MembroResponseDTO membroDesativado = desativarMembroServico.desativar(id);

        if (membroDesativado != null) {
            return ResponseEntity.ok(membroDesativado);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @Operation(summary = "Remover um membro")
    @ApiResponse(responseCode = "200", description = "Retorna os dados do membro removido")
    @ApiResponse(responseCode = "404", description = "Membro ou projeto não encontrado")
    @DeleteMapping("/{membroId}")
    public ResponseEntity<Void> removerMembro(@PathVariable Long membroId) {
        removerMembroProjetoServico.removerMembro(membroId);
        return ResponseEntity.noContent().build();
    }

    @Operation(summary = "Obter lista de membros")
    @ApiResponse(responseCode = "200", description = "Retorna a lista de membros")
    @GetMapping(path = "projeto/{idProjeto}/obter")
    public ResponseEntity<List<MembroResponseDTO>> obterListaMembros(@PathVariable Long idProjeto,
            @RequestParam(name = "ativo", required = false, defaultValue = "true") boolean ativo) {
        List<MembroResponseDTO> listaMembros = listarMembroServico.obterListaMembros(idProjeto, ativo);
        return ResponseEntity.ok(listaMembros);
    }

    @Operation(summary = "Obter membro")
    @ApiResponse(responseCode = "200", description = "Retorna um membro pelo id")
    @GetMapping(path = "/{id}")
    public ResponseEntity<MembroResponseDTO> obterMembro(@PathVariable Long id) {
        return ResponseEntity.ok(obterMembroPorIdServico.obterMembroPorId(id));
    }

    @Operation(summary = "Ativar um membro projeto")
    @ApiResponse(responseCode = "200", description = "Retorna os dados do membro ativado")
    @ApiResponse(responseCode = "404", description = "membro não encontrado")
    @PostMapping(path = "/{id}/ativar")
    public ResponseEntity<String> ativarMembro(@PathVariable Long id) {
        String membroAtivado = ativarMembroServico.ativar(id);

        if (membroAtivado != null) {
            return ResponseEntity.ok(membroAtivado);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
