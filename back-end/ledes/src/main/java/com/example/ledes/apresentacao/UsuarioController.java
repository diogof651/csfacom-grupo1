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

import com.example.ledes.aplicacao.usuario.AdicionarUsuarioServico;
import com.example.ledes.aplicacao.usuario.AtualizarUsuarioServico;
import com.example.ledes.aplicacao.usuario.BuscarUsuarioNoticiaServico;
import com.example.ledes.infraestrutura.dto.UsuarioDTO;
import com.example.ledes.infraestrutura.dto.UsuarioRequestDTO;
import com.example.ledes.infraestrutura.dto.UsuarioResponseDTO;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;

@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping("/api/v1/usuarios")
public class UsuarioController {
    @Autowired
    private AdicionarUsuarioServico usuarioServico;
    @Autowired
    private AtualizarUsuarioServico atualizarUsuarioServico;
    @Autowired
    private BuscarUsuarioNoticiaServico buscarUsuarioIdNoticiaServico;

    @Operation(summary = "Criar um novo usuário")
    @ApiResponse(responseCode = "201")
    @PostMapping(consumes = "application/json")
    public ResponseEntity<UsuarioResponseDTO> cadastrarUsuario(@RequestBody UsuarioDTO usuarioDTO) {
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

    @Operation(summary = "Buscar usuário com noticia")
    @ApiResponse(responseCode = "200", description = "Retorna os dados dos usuários")
    @ApiResponse(responseCode = "404", description = "Usuário não encontrado")
    @GetMapping(path = "/autores")
    public ResponseEntity<List<UsuarioResponseDTO>> buscarUsuarioNoticiaId() {

        List<UsuarioResponseDTO> usuarios = buscarUsuarioIdNoticiaServico.buscarUsuariosNoticia();

        if (usuarios != null) {
            return ResponseEntity.ok(usuarios);
        } else {
            return ResponseEntity.notFound().build();
        }

    }

    //primeiro acesso


}
