package com.example.ledes.apresentacao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;

import com.example.ledes.aplicacao.membro.ListarMembroServico;
import com.example.ledes.infraestrutura.dto.MembroResponseDTO;

import java.util.List;

@RestController
@RequestMapping("/api/v1/membros")
public class MembroController {
    @Autowired
    private ListarMembroServico listarMembroServico;

    @Operation(summary = "Obter lista de membros")
    @ApiResponse(responseCode = "200", description = "Retorna a lista de membros")
    @GetMapping
    public ResponseEntity<List<MembroResponseDTO>> obterListaMembros(
        @RequestParam(name = "ativos", required = false, defaultValue = "true") boolean ativos) {
            List<MembroResponseDTO> listaMembros = listarMembroServico.obterListaMembros(ativos);
        return ResponseEntity.ok(listaMembros);
    }
    
    
}
