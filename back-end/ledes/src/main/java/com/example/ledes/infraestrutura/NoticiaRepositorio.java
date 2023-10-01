package com.example.ledes.infraestrutura;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.ledes.dominio.Noticia;
import com.example.ledes.dominio.Usuario;

@Repository
public interface NoticiaRepositorio extends CrudRepository<Noticia, Long> {

        @Query("SELECT n FROM Noticia n WHERE "
       + "(:titulo IS NULL OR n.titulo LIKE CONCAT('%', :titulo, '%')) AND "
       + "(:usuario IS NULL OR n.autor = :usuario) AND "
       //+ "(:dataPublicacao IS NULL OR n.dataPublicacao = :dataPublicacao) AND "
       + "(:estado IS NULL OR n.estado = :estado)")
        List<Noticia> buscarNoticiasPorParametros(
                        @Param("titulo") String titulo,
                        @Param("usuario") Usuario usuario,
                        //@Param("dataPublicacao") Date dataPublicacao,
                        @Param("estado") String estado);
                        //teste de data para usar no swagger
                        //2023-09-30T20:38:58.301Z


}