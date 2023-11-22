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
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.ledes.aplicacao.usuario.AdicionarUsuarioServico;
import com.example.ledes.aplicacao.usuario.AtualizarSenhaUsuarioServico;
import com.example.ledes.aplicacao.usuario.AtualizarUsuarioServico;
import com.example.ledes.aplicacao.usuario.AtualizarUsuarioServicoGerenciar;
import com.example.ledes.aplicacao.usuario.BuscaUsuarioPorFiltroServicoGerenciar;
import com.example.ledes.aplicacao.usuario.BuscarUsuarioNoticiaServico;
import com.example.ledes.aplicacao.usuario.BuscarUsuarioPorHashServico;
import com.example.ledes.aplicacao.usuario.BuscarUsuarioPorIdServico;
import com.example.ledes.aplicacao.usuario.ListagemPermissoesServico;
import com.example.ledes.aplicacao.usuario.ValidarEmailECodigoUnicoServico;
import com.example.ledes.aplicacao.usuario.ValidarEmailESenhaServico;
import com.example.ledes.infraestrutura.dto.DefinirSenhaRequestDTO;
import com.example.ledes.infraestrutura.dto.PerfilUsuarioRequestDTO;
import com.example.ledes.infraestrutura.dto.PermissaoResponseDTO;
import com.example.ledes.infraestrutura.dto.UsuarioGerenciarRequestDTO;
import com.example.ledes.infraestrutura.dto.UsuarioGerenciarResponseDTO;
import com.example.ledes.infraestrutura.dto.UsuarioLoginResponseDTO;
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
    private AtualizarUsuarioServico atualizarPerfilUsuarioServico;
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
    @Autowired
    private BuscarUsuarioPorHashServico buscarUsuarioPorHashServico;
    @Autowired
    private AtualizarUsuarioServicoGerenciar atualizarPerfilUsuarioServicoGerenciar;
    @Autowired
    private ListagemPermissoesServico listagemPermissoesServico;
    @Autowired
    private BuscaUsuarioPorFiltroServicoGerenciar buscarUsuarioPorFiltro;

    @Operation(summary = "Criar um novo usuário, restritos apenas para administradores")
    @ApiResponse(responseCode = "201")
    @PostMapping(consumes = "application/json")
    public ResponseEntity<UsuarioResponseDTO> cadastrarUsuario(@RequestBody UsuarioGerenciarRequestDTO usuarioDTO,
            @RequestHeader("usuarioLogado") String hash) {
        if (hash != null) {
            UsuarioResponseDTO novoUsuario = usuarioServico.adicionar(usuarioDTO, hash);
            return new ResponseEntity<>(novoUsuario, HttpStatus.CREATED);
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
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

    // verificar se está sendo usado
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

    @Operation(summary = "Buscar informações do perfil do usuario logado")
    @ApiResponse(responseCode = "200", description = "Retorna os dados do usuário.")
    @ApiResponse(responseCode = "404", description = "Usuário não encontrado")
    @GetMapping("/perfil")
    public ResponseEntity<UsuarioResponseDTO> buscarUsuarioPorHash(
            @RequestHeader("usuarioLogado") String hash) {
        if (hash != null) {
            UsuarioResponseDTO usuarioEncontrado = buscarUsuarioPorHashServico.buscarUsuarioPorHash(hash);
            if (usuarioEncontrado != null) {
                return ResponseEntity.ok(usuarioEncontrado);
            }
        }
        return ResponseEntity.notFound().build();
    }

    @Operation(summary = "Atualização de dados do perfil de um usuario logado")
    @ApiResponse(responseCode = "200", description = "Retorna os dados atualizados")
    @ApiResponse(responseCode = "404", description = "Usuário não encontrado")
    @PutMapping(path = "/{codigoUnico}", consumes = "application/json")
    public ResponseEntity<UsuarioResponseDTO> atualizarPerfilUsuarioServico(
            @PathVariable String codigoUnico, @RequestHeader("usuarioLogado") String hash,
            @RequestBody PerfilUsuarioRequestDTO perfilAtualizacaoDTO) {
        if (hash != null) {
            UsuarioResponseDTO usuarioAtualizado = atualizarPerfilUsuarioServico.atualizarPerfilUsuario(codigoUnico,
                    perfilAtualizacaoDTO);
            return ResponseEntity.ok(usuarioAtualizado);
        }
        return ResponseEntity.notFound().build();
    }

    @Operation(summary = "Listar Permissões")
    @ApiResponse(responseCode = "200", description = "Retorna a listagem de permissões")
    @GetMapping("/permissoes")
    public ResponseEntity<List<PermissaoResponseDTO>> listarPermissoes() {

        List<PermissaoResponseDTO> listagemPermissoes = listagemPermissoesServico.listarPermissoes();

        if (listagemPermissoes != null) {
            return ResponseEntity.ok(listagemPermissoes);
        }
        return ResponseEntity.notFound().build();
    }

    @Operation(summary = "Atualização de dados do perfil de um usuario logado (Gerenciamento)")
    @ApiResponse(responseCode = "200", description = "Retorna os dados atualizados")
    @ApiResponse(responseCode = "404", description = "Usuário não encontrado")
    @PutMapping(path = "/{id}/gerenciarUsuario", consumes = "application/json")
    public ResponseEntity<UsuarioGerenciarResponseDTO> atualizarPerfilUsuarioGerenciar(
            @PathVariable Long id, @RequestHeader("usuarioLogado") String hash,
            @RequestBody UsuarioGerenciarRequestDTO usuarioGerenciarRequestDTO) {
        if (hash != null) {
            UsuarioGerenciarResponseDTO usuarioAtualizado = atualizarPerfilUsuarioServicoGerenciar
                    .atualizarPerfilUsuarioGerenciar(id,
                            usuarioGerenciarRequestDTO, hash);
            return ResponseEntity.ok(usuarioAtualizado);
        }
        return ResponseEntity.notFound().build();
    }

    @Operation(summary = "Buscar informações de usuários para a tela (Gerenciamento)")
    @ApiResponse(responseCode = "200", description = "Retorna informações de usuários com base nos filtros")
    @GetMapping("/gerenciar")
    public ResponseEntity<List<UsuarioGerenciarResponseDTO>> buscarUsuarioGerenciar(
            @RequestParam(name = "nome", required = false) String nome,
            @RequestParam(name = "permissao", required = false) String permissao) {
        List<UsuarioGerenciarResponseDTO> usuariosEncontrados = buscarUsuarioPorFiltro.buscarUsuarioPorFiltro(nome,
                permissao);
        if (usuariosEncontrados != null) {
            return ResponseEntity.ok(usuariosEncontrados);
        }
        return ResponseEntity.notFound().build();
    }

}
