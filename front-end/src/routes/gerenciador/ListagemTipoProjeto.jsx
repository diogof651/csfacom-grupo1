import React, { useEffect, useState } from "react";
import { Listagem } from "./Listagem";

export function ListagemTipoProjeto() {
  const [tiposDeProjeto, setTiposDeProjeto] = useState([]);

  useEffect(() => {
    obterTiposDeProjeto();
  }, []);

  function obterTiposDeProjeto() {
    fetch("http://localhost:8080/api/v1/tipoProjeto/listagem/", {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((resposta) => resposta.json())
      .then((data) => {
        setTiposDeProjeto(data);
      })
      .catch((erro) => console.log(erro));
  }

  function desativar(id) {
    fetch(`http://localhost:8080/api/v1/tipoProjeto/${id}/desativar`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((resposta) => obterTiposDeProjeto())
      .catch((erro) => console.log(erro));
  }

  function ativar(id) {
    fetch(`http://localhost:8080/api/v1/tipoProjeto/${id}/ativar`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((resposta) => obterTiposDeProjeto())
      .catch((erro) => console.log(erro));
  }

  function salvar(tipoProjeto) {
    if (tipoProjeto.id) {
      fetch(`http://localhost:8080/api/v1/tipoProjeto/${tipoProjeto.id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ nome: tipoProjeto.nome }),
      })
        .then(() => obterTiposDeProjeto())
        .catch((erro) => console.log(erro));
    } else {
      fetch("http://localhost:8080/api/v1/tipoProjeto/", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(tipoProjeto),
      })
        .then(() => obterTiposDeProjeto())
        .catch((erro) => console.log(erro));
    }
  }

  return (
    <>
      <Listagem
        titulo={"Tipo de Projeto"}
        lista={tiposDeProjeto}
        salvar={salvar}
        desativar={desativar}
        ativar={ativar}
      ></Listagem>
    </>
  );
}
