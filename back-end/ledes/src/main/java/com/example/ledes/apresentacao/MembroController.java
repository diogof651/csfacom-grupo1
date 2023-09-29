package com.example.ledes.apresentacao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.ledes.aplicacao.membro.AtualizarMembroServico;
import com.example.ledes.aplicacao.membro.CadastrarMembroServico;
import com.example.ledes.aplicacao.membro.DesativarMembroServico;
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


    @Operation(summary = "Criar um novo membro")
    @ApiResponse(responseCode = "201")
    @PostMapping(consumes = "application/json")
    public ResponseEntity<MembroResponseDTO> cadastrarMembro(@RequestBody MembroRequestDTO membrorequestDTO) {
        MembroResponseDTO novoMembro = cadastrarMembroServico.adicionar(membrorequestDTO);
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
    @PostMapping(path = "/{id}/desativar", consumes = "application/json")
    public ResponseEntity<MembroResponseDTO> desativarMembro(@PathVariable Long id) {
        MembroResponseDTO membroDesativado = desativarMembroServico.desativar(id);

        if (membroDesativado != null) {
            return ResponseEntity.ok(membroDesativado);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @Operation(summary = "Remover um membro de um projeto")
    @ApiResponse(responseCode = "200", description = "Retorna os dados do membro removido")
    @ApiResponse(responseCode = "404", description = "Membro ou projeto não encontrado")
    @DeleteMapping("/{membroId}/{projetoId}")
    public ResponseEntity<MembroResponseDTO> removerMembroProjeto(
            @PathVariable Long membroId,
            @PathVariable Long projetoId
    ) {
        MembroResponseDTO membroRemovido = removerMembroProjetoServico.desativar(membroId, projetoId);

        if (membroRemovido != null) {
            return ResponseEntity.ok(membroRemovido);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}

