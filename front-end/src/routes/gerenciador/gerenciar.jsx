import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import { useAuth } from "../../AutorizacaoServico";
import { ListagemTipoPapel } from "./ListagemTipoPapel";
import { ListagemTipoProjeto } from "./ListagemTipoProjeto";
import { ListagemTipoVinculo } from "./ListagemTipoVinculo";
import { ListagemUsuario } from "./ListagemUsuario";

export function Gerenciar() {
  const [abaAtiva, setAbaAtiva] = useState("usuarios");
  const [temPermissao, setTemPermissao] = useState(false);
  const { hashUsuarioLogado } = useAuth();

  useEffect(() => {
    function obterPermissoesUsuario() {
      fetch("http://localhost:8080/api/v1/usuarios/obterPermissoes", {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          usuarioLogado: hashUsuarioLogado(),
        },
      })
        .then((resposta) => resposta.json())
        .then((data) => {
          const permissoes = data;
          setTemPermissao(
            permissoes.some((permissao) => permissao.nome === "ADMIN")
          );
        })
        .catch((erro) => console.log(erro));
    }

    obterPermissoesUsuario();
  }, []);

  const selecionarAba = (aba) => {
    setAbaAtiva(aba);
  };

  return (
    <>
      {temPermissao ? (
        <Container style={{ marginTop: "40px" }}>
          <h1 style={{ fontFamily: "Inter", fontWeight: "bold" }}>Gerenciar</h1>
          <div className="d-flex justify-content-between align-items-center">
            <ul className="nav nav-tabs w-100" role="tablist">
              <li className="nav-item" role="presentation">
                <button
                  onClick={() => selecionarAba("usuarios")}
                  className={`nav-link ${
                    abaAtiva === "usuarios" ? "active" : ""
                  }`}
                >
                  Usuários
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button
                  onClick={() => selecionarAba("membros")}
                  className={`nav-link ${
                    abaAtiva === "membros" ? "active" : ""
                  }`}
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
      ) : (
        <h1>Você não tem permissão para acessar esta página.</h1>
      )}
    </>
  );
}
