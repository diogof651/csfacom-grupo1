package com.example.ledes.aplicacao.usuario;

import org.springframework.transaction.annotation.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.ledes.dominio.Usuario;
import com.example.ledes.infraestrutura.UsuarioRepositorio;
import com.example.ledes.infraestrutura.dto.UsuarioRequestDTO;
import com.example.ledes.infraestrutura.dto.UsuarioResponseDTO;

@Service
public class AtualizarUsuarioServico<UsuarioAtualizacaoDTO> {

    @Autowired
    private UsuarioRepositorio usuarioRepositorio;

    @Transactional
    public UsuarioResponseDTO atualizarUsuario(Long id, UsuarioRequestDTO usuarioRequestDTO) {
        // Verifique se o usuário com o ID especificado existe
        Usuario usuario = usuarioRepositorio.findById(id).orElse(null);

        if (usuario != null) {
            usuario.setNome(usuarioRequestDTO.getNome());
            
            if (usuarioRequestDTO.getEmail() != null) {
                usuario.setEmail(usuarioRequestDTO.getEmail());
            }
            if (usuarioRequestDTO.isAtivo() != usuario.isAtivo()) {
                usuario.setAtivo(usuarioRequestDTO.isAtivo());
            }

            // Retornar o projeto atualizado como ProjetoResponseDTO
            
             usuarioRepositorio.save(usuario);
            // Salve o usuário atualizado no banco de dados
            return new UsuarioResponseDTO(usuario.getId(), usuario.getNome(), usuario.getEmail(),usuario.getSenha(),usuario.isAtivo(),usuario.getFotoPerfil(),usuario.getLink());
        } else {
            return null; // Pode retornar uma resposta adequada ou lançar uma exceção se o usuário não for encontrado
        }
    }
}
