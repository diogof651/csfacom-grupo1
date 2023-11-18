import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import { ListagemTipoPapel } from "./ListagemTipoPapel";
import { ListagemTipoProjeto } from "./ListagemTipoProjeto";
import { ListagemTipoVinculo } from "./ListagemTipoVinculo";
import { ListagemUsuario } from "./ListagemUsuario";

export function Gerenciar() {
  const [abaAtiva, setAbaAtiva] = useState("usuarios");

  const selecionarAba = (aba) => {
    setAbaAtiva(aba);
  };

  return (
    <Container style={{ marginTop: "40px" }}>
      <h1 style={{ fontFamily: "Inter", fontWeight: "bold" }}>Gerenciar</h1>
      <div className="d-flex justify-content-between align-items-center">
        <ul className="nav nav-tabs w-100" role="tablist">
          <li className="nav-item" role="presentation">
            <button
              onClick={() => selecionarAba("usuarios")}
              className={`nav-link ${abaAtiva === "usuarios" ? "active" : ""}`}
            >
              Usuários
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button
              onClick={() => selecionarAba("membros")}
              className={`nav-link ${abaAtiva === "membros" ? "active" : ""}`}
            >
              Membros
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button
              onClick={() => selecionarAba("tipo-de-projeto")}
              className={`nav-link ${
                abaAtiva === "tipo-de-projeto" ? "active" : ""
              }`}
            >
              Tipos de Projeto
            </button>
          </li>
        </ul>
      </div>
      {abaAtiva === "usuarios" && <ListagemUsuario></ListagemUsuario>}

      {abaAtiva === "membros" && (
        <>
          <ListagemTipoVinculo></ListagemTipoVinculo>
          <ListagemTipoPapel></ListagemTipoPapel>
        </>
      )}

      {abaAtiva === "tipo-de-projeto" && (
        <ListagemTipoProjeto></ListagemTipoProjeto>
      )}
    </Container>
  );
}
