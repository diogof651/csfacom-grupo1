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

    @Query("SELECT DISTINCT u FROM Usuario u JOIN u.permissoes p WHERE (COALESCE(:nome, '') = '' OR LOWER(u.nome) LIKE LOWER(CONCAT('%', :nome, '%'))) AND (COALESCE(:permissao, '') = '' OR EXISTS (SELECT 1 FROM u.permissoes p2 WHERE LOWER(p2.nome) = LOWER(:permissao))) ORDER BY u.nome")
    Collection<Usuario> buscarUsuarioPorFiltro(@Param("nome") String nome, @Param("permissao") String permissao);
}
