package com.example.ledes.infraestrutura;

import java.util.List;
import org.springframework.data.repository.CrudRepository;


import com.example.ledes.dominio.TipoPapel;

public interface TipoPapelRepositorio extends CrudRepository<TipoPapel, Long> {

    TipoPapel findByTipo(String tipo);

    List<TipoPapel> findByAtivoTrue();


}
