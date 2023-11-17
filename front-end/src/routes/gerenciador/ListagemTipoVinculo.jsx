import React, { useEffect, useState } from "react";
import { Listagem } from "./Listagem";

export function ListagemTipoVinculo() {
  const [tiposDeVinculo, setTiposDeVinculo] = useState([]);
  const url = "http://localhost:8080/api/v1/tipoVinculo";

  useEffect(() => {
    obterTiposDeVinculo();
  }, []);

  function obterTiposDeVinculo() {
    fetch(url + "/listagem/", {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((resposta) => resposta.json())
      .then((data) => {
        setTiposDeVinculo(data);
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
      .then((resposta) => obterTiposDeVinculo())
      .catch((erro) => console.log(erro));
  }

  function ativar(id) {
    fetch(`${url}/${id}/ativar`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((resposta) => obterTiposDeVinculo())
      .catch((erro) => console.log(erro));
  }

  function salvar(tipoProjeto) {
    if (tipoProjeto.id) {
      fetch(`${url}/${tipoProjeto.id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ nome: tipoProjeto.nome }),
      })
        .then(() => obterTiposDeVinculo())
        .catch((erro) => console.log(erro));
    } else {
      fetch(`${url}/`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(tipoProjeto),
      })
        .then(() => obterTiposDeVinculo())
        .catch((erro) => console.log(erro));
    }
  }

  return (
    <>
      <Listagem
        titulo={"Tipo de Vinculo"}
        lista={tiposDeVinculo}
        salvar={salvar}
        desativar={desativar}
        ativar={ativar}
      ></Listagem>
    </>
  );
}
