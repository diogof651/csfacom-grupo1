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

import com.example.ledes.aplicacao.usuario.AdicionarUsuarioServico;
import com.example.ledes.aplicacao.usuario.AtualizarSenhaUsuarioServico;
import com.example.ledes.aplicacao.usuario.AtualizarUsuarioServico;
import com.example.ledes.aplicacao.usuario.BuscarUsuarioNoticiaServico;
import com.example.ledes.aplicacao.usuario.BuscarUsuarioPorIdServico;
import com.example.ledes.aplicacao.usuario.ValidarEmailECodigoUnicoServico;
import com.example.ledes.aplicacao.usuario.ValidarEmailESenhaServico;
import com.example.ledes.infraestrutura.dto.DefinirSenhaRequestDTO;
import com.example.ledes.infraestrutura.dto.UsuarioDTO;
import com.example.ledes.infraestrutura.dto.UsuarioLoginResponseDTO;
import com.example.ledes.infraestrutura.dto.UsuarioRequestDTO;
import com.example.ledes.infraestrutura.dto.UsuarioResponseDTO;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;

@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping(path = { "/api/v1/usuarios" }, produces = { "application/json" })
public class UsuarioController {
    @Autowired
    private AdicionarUsuarioServico usuarioServico;
    @Autowired
    private AtualizarUsuarioServico atualizarUsuarioServico;
    @Autowired
    private BuscarUsuarioNoticiaServico buscarUsuarioIdNoticiaServico;
    @Autowired
    private ValidarEmailESenhaServico validarEmailESenhaServico;
    @Autowired
    private BuscarUsuarioPorIdServico buscarUsuarioPorIdServico;
    @Autowired
    private ValidarEmailECodigoUnicoServico validarEmailECodigoUnicoServico;
    @Autowired
    private AtualizarSenhaUsuarioServico atualizarSenhaUsuarioServico;

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

    @Operation(summary = "Login de usuario")
    @ApiResponse(responseCode = "200", description = "Retorna os dados do usuário e realiza a autenticação.")
    @ApiResponse(responseCode = "404", description = "Usuário não encontrado")
    @PostMapping(path = "/login", consumes = "application/json")
    public ResponseEntity<UsuarioLoginResponseDTO> validarEmailESenha(
            @RequestBody DefinirSenhaRequestDTO loginRequest) {
        UsuarioLoginResponseDTO usuarioEncontrado = validarEmailESenhaServico.autenticar(loginRequest.getCodigoUnico(),
                loginRequest.getSenha());

        if (usuarioEncontrado.getResposta().equals("Informações Incorretas")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(usuarioEncontrado);
        }
        return ResponseEntity.ok(usuarioEncontrado);
    }

    @Operation(summary = "Buscar usuário por ID.")
    @ApiResponse(responseCode = "200", description = "Retorna os dados do usuário.")
    @ApiResponse(responseCode = "404", description = "Usuário não encontrado")
    @GetMapping("/{id}")
    public ResponseEntity<UsuarioResponseDTO> buscarUsuarioPorId(@PathVariable Long id) {
        UsuarioResponseDTO usuarioEncontrado = buscarUsuarioPorIdServico.buscarUsuarioPorId(id);

        if (usuarioEncontrado != null) {
            return ResponseEntity.ok(usuarioEncontrado);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @Operation(summary = "Primeiro acesso.")
    @ApiResponse(responseCode = "200", description = "Verificar validade de email e código único")
    @ApiResponse(responseCode = "404", description = "Não foi encontrado email ou código único.")
    @GetMapping("/verificacaoParaDefinicaoDeSenha")
    public ResponseEntity<UsuarioLoginResponseDTO> verificarEmaileCodigoUnico(@RequestParam String email,
            @RequestParam String codigoUnico) {
        return ResponseEntity.ok(validarEmailECodigoUnicoServico.verificar(email, codigoUnico));
    }

    @Operation(summary = "Esqueci a senha.")
    @ApiResponse(responseCode = "200", description = "Altera a senha")
    @PostMapping("/alterarSenha")
    public ResponseEntity<UsuarioLoginResponseDTO> alterarSenha(
            @RequestBody DefinirSenhaRequestDTO definirSenhaRequestDTO) {
        return ResponseEntity.ok(atualizarSenhaUsuarioServico.alterarSenha(definirSenhaRequestDTO));
    }
}
