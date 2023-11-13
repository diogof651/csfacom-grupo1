package com.example.ledes.apresentacao;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

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
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.ledes.aplicacao.usuario.AdicionarUsuarioServico;
import com.example.ledes.aplicacao.usuario.AtualizarSenhaUsuarioServico;
import com.example.ledes.aplicacao.usuario.AtualizarUsuarioServico;
import com.example.ledes.aplicacao.usuario.BuscarUsuarioNoticiaServico;
import com.example.ledes.aplicacao.usuario.BuscarUsuarioPorHashServico;
import com.example.ledes.aplicacao.usuario.BuscarUsuarioPorIdServico;
import com.example.ledes.aplicacao.usuario.ValidarEmailECodigoUnicoServico;
import com.example.ledes.aplicacao.usuario.ValidarEmailESenhaServico;
import com.example.ledes.dominio.Permissao;
import com.example.ledes.dominio.Usuario;
import com.example.ledes.infraestrutura.PermissaoRepositorio;
import com.example.ledes.infraestrutura.UsuarioRepositorio;
import com.example.ledes.infraestrutura.dto.DefinirSenhaRequestDTO;
import com.example.ledes.infraestrutura.dto.PerfilUsuarioRequestDTO;
import com.example.ledes.infraestrutura.dto.PermissaoResponseDTO;
import com.example.ledes.infraestrutura.dto.UsuarioDTO;
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
    private UsuarioRepositorio usuarioRepositorio; 
    @Autowired
    private PermissaoRepositorio permissaoRepositorio;

    @Operation(summary = "Criar um novo usuário, restritos apenas para administradores")
    @ApiResponse(responseCode = "201")
    @PostMapping(consumes = "application/json")
    public ResponseEntity<UsuarioResponseDTO> cadastrarUsuario(@RequestBody UsuarioDTO usuarioDTO) {
        UsuarioResponseDTO novoUsuario = usuarioServico.adicionar(usuarioDTO);
        return new ResponseEntity<>(novoUsuario, HttpStatus.CREATED);
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
    @Operation(summary = "Adicionar permissão a um usuário")
    @ApiResponse(responseCode = "200", description = "Permissão adicionada com sucesso")
    @ApiResponse(responseCode = "400", description = "Requisição inválida")
    @ApiResponse(responseCode = "404", description = "Usuário ou permissão não encontrados")
    @PostMapping("/usuarios/{usuarioId}/permissoes/{permissaoNome}")
    public ResponseEntity<String> adicionarPermissaoAoUsuario(
            @PathVariable Long usuarioId,
            @PathVariable String permissaoNome) {

        Optional<Usuario> usuarioOptional = usuarioRepositorio.findById(usuarioId);
        Permissao permissao = permissaoRepositorio.findByNome(permissaoNome);

        if (usuarioOptional.isPresent() && permissao != null) {
            Usuario usuario = usuarioOptional.get();

            if (usuario.getPermissoes().isEmpty()) {
                usuario.getPermissoes().add(permissao);// olhar aqui
                usuarioRepositorio.save(usuario);
                return ResponseEntity.status(HttpStatus.OK).body("Permissão adicionada ao usuário.");
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("O usuário já possui uma permissão.");
            }
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Usuário ou permissão não encontrados.");
        }
    }

    @Operation(summary = "Remover permissão de um usuário")
    @ApiResponse(responseCode = "200", description = "Permissão removida com sucesso")
    @ApiResponse(responseCode = "400", description = "Requisição inválida")
    @ApiResponse(responseCode = "404", description = "Usuário ou permissão não encontrados")
    @DeleteMapping("/usuarios/{usuarioId}/permissoes/{permissaoNome}")
    public ResponseEntity<String> removerPermissaoDoUsuario(
            @PathVariable Long usuarioId,
            @PathVariable String permissaoNome) {

        Optional<Usuario> usuarioOptional = usuarioRepositorio.findById(usuarioId);
        Permissao permissao = permissaoRepositorio.findByNome(permissaoNome);

        if (usuarioOptional.isPresent() && permissao != null) {
            Usuario usuario = usuarioOptional.get();

            if (usuario.getPermissoes().contains(permissao)) {
                usuario.getPermissoes().remove(permissao);//olhar aqui se vai dar ruim
                usuarioRepositorio.save(usuario);
                return ResponseEntity.status(HttpStatus.OK).body("Permissão removida do usuário.");
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("O usuário não possui essa permissão.");
            }
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Usuário ou permissão não encontrados.");
        }
    }

    @GetMapping("/permissoes")
    public ResponseEntity<List<PermissaoResponseDTO>> listarPermissoes() {
        List<Permissao> permissoes = (List<Permissao>) permissaoRepositorio.findAll(); 
                                                                   
        List<PermissaoResponseDTO> permissaoDTOs = permissoes.stream()
        .map(permissao -> {
            PermissaoResponseDTO dto = new PermissaoResponseDTO();
            dto.setNome(permissao.getNome()); 
            return dto;
        })
        .collect(Collectors.toList());
        return ResponseEntity.ok(permissaoDTOs);
    }

}
