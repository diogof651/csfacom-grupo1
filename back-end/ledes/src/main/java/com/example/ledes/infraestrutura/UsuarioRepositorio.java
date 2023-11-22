package com.example.ledes.infraestrutura;

import java.util.Collection;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import com.example.ledes.dominio.Usuario;

public interface UsuarioRepositorio extends CrudRepository<Usuario, Long> {

    Usuario findByNome(String nome);

    Usuario findByEmail(String email);

    Usuario findByCodigoUnico(String codigoUnico);

    Optional<Usuario> findByCodigoHash(String hash);

    @Query("SELECT DISTINCT n.autor FROM Noticia n")
    List<Usuario> encontrarAutoresDeNoticias();

    @Query("SELECT DISTINCT u FROM Usuario u WHERE (:nome IS NULL OR u.nome LIKE CONCAT('%', :nome, '%') OR :nome = '') ORDER BY u.nome")
    Collection<Usuario> buscarUsuarioPorFiltro(@Param("nome") String nome);

    /*
     * @Query("SELECT DISTINCT u FROM Usuario u LEFT JOIN FETCH u.permissoes WHERE (:nome IS NULL OR u.nome LIKE CONCAT('%', :nome, '%') OR :nome = '') AND (:permissao IS NULL OR :permissao MEMBER OF u.permissoes) AND u.ativo = true ORDER BY u.nome"
     * )
     * Collection<Usuario> buscarUsuarioPorFiltro(@Param("nome") String
     * nome, @Param("permissao") String permissao);
     */
}
