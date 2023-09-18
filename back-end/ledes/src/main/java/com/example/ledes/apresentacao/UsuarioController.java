package com.example.ledes.apresentacao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;

import com.example.ledes.aplicacao.usuario.AdicionarUsuarioServico;
import com.example.ledes.aplicacao.usuario.AtualizarUsuarioServico;
import com.example.ledes.infraestrutura.dto.UsuarioRequestDTO;
import com.example.ledes.infraestrutura.dto.UsuarioResponseDTO;
@RestController
@RequestMapping("/api/v1/usuarios")
public class UsuarioController {
    @Autowired
    private AdicionarUsuarioServico usuarioServico;
    @Autowired
    private AtualizarUsuarioServico atualizarUsuarioServico;

    @Operation(summary = "Criar um novo usuário")
    @ApiResponse(responseCode = "201")
    @PostMapping(consumes = "application/json")
    public ResponseEntity<UsuarioResponseDTO> cadastrarUsuario(@RequestBody UsuarioRequestDTO usuarioDTO) {
        UsuarioResponseDTO novoUsuario = usuarioServico.adicionar(usuarioDTO);
        return new ResponseEntity<>(novoUsuario, HttpStatus.CREATED);
    }

    @Operation(summary = "Atualizar um usuário")
    @ApiResponse(responseCode = "200", description = "Retorna os dados atualizados")
    @ApiResponse(responseCode = "404", description = "Usuário não encontrado")
    @PutMapping(path = "/{id}", consumes = "application/json")
    public ResponseEntity<UsuarioResponseDTO> atualizarUsuario(
        @PathVariable Long id, @RequestBody UsuarioRequestDTO atualizacaoDTO) {
            UsuarioResponseDTO usuarioAtualizado = atualizarUsuarioServico.atualizarUsuario(id, atualizacaoDTO);
        return ResponseEntity.ok(usuarioAtualizado);
    }
}

