package com.example.ledes.infraestrutura;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import com.example.ledes.dominio.Usuario;

public interface UsuarioRepositorio extends CrudRepository<Usuario, Long> {

    Usuario findByNome(String nome);

    Usuario findByEmail(String email);

    Usuario findByCodigoHash(String hash);
    
    Usuario findByCodigoUnico(String codigoUnico);

    Optional<Usuario> findByCodigoHash(String hash);

    @Query("SELECT DISTINCT n.autor FROM Noticia n")
    List<Usuario> encontrarAutoresDeNoticias();
}
