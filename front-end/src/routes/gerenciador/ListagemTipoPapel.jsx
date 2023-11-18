import React, { useEffect, useState } from "react";
import { Listagem } from "./Listagem";

export function ListagemTipoPapel() {
  const [tiposDePapel, setTiposDePapel] = useState([]);
  const url = "http://localhost:8080/api/v1/tipoPapel";

  useEffect(() => {
    obterTiposDePapel();
  }, []);

  function obterTiposDePapel() {
    fetch(url + "/listagem/", {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((resposta) => resposta.json())
      .then((data) => {
        setTiposDePapel(data);
      })
      .catch((erro) => console.log(erro));
  }

  function desativar(id) {
    fetch(`${url}/${id}/desativar`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((resposta) => obterTiposDePapel())
      .catch((erro) => console.log(erro));
  }

  function ativar(id) {
    fetch(`${url}/${id}/ativar`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((resposta) => obterTiposDePapel())
      .catch((erro) => console.log(erro));
  }

  function salvar(tipo) {
    if (tipo.id) {
      fetch(`${url}/${tipo.id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ nome: tipo.nome }),
      })
        .then(() => obterTiposDePapel())
        .catch((erro) => console.log(erro));
    } else {
      fetch(`${url}/`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(tipo),
      })
        .then(() => obterTiposDePapel())
        .catch((erro) => console.log(erro));
    }
  }

  return (
    <>
      <Listagem
        titulo={"Tipo de Papel"}
        lista={tiposDePapel}
        salvar={salvar}
        desativar={desativar}
        ativar={ativar}
      ></Listagem>
    </>
  );
}
