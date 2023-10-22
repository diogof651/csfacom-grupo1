import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router";

import { useLocation } from "react-router-dom";
import Alert from "../../../components/Alert/Alert";
import { BotaoComFundo } from "../../../components/Botoes/BotaoComFundo";
import { BotaoOutline } from "../../../components/Botoes/BotaoOutline";
import { Input } from "../../../components/Input/Input";
import "./PrimeiroAcesso.css";

export function PrimeiroAcesso() {
  const navigate = useNavigate();
  const location = useLocation();

  const [mensagemErro, setMensagemErro] = useState("");
  const [email, setEmail] = useState("");
  const [codigoUnico, setCodigoUnico] = useState("");

  let titulo;

  switch (location.pathname) {
    case "/primeiroAcesso":
      titulo = "Primeiro Acesso";
      break;
    case "/esqueciMinhaSenha":
      titulo = "Esqueci Minha Senha";
      break;
  }

  const onSubmit = (e) => {
    e.preventDefault();

    fetch(
      `http://localhost:8080/api/v1/usuarios/verificacaoParaDefinicaoDeSenha?email=${email}&codigoUnico=${codigoUnico}`,
      {
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
      }
    )
      .then((resposta) => {
        // nao autorizado (credenciais incorretas)

        resposta.json().then((dados) => {
          if (dados.resposta === "Informações corretas") {
            navigate(`/definirSenha/${codigoUnico}`);
          } else {
            setMensagemErro(dados.resposta);
          }
        });
      })
      .catch((erro) => console.log(erro));
  };

  function cancelar() {
    navigate("/");
  }

  return (
    <div className="container-modal-fundo">
      <div className="container-modal">
        <div className="modal-conteudo">
          <Form
            className={`d-flex justify-content-center flex-column form-container w-100`}
            onSubmit={onSubmit}
          >
            <div className="mb-3">
              <h1 style={{ fontFamily: "Inter", fontWeight: "bold" }}>
                {titulo}
              </h1>
              {mensagemErro && <Alert type="erro">{mensagemErro}</Alert>}

              <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                label={"Email*"}
                required={true}
                placeholder={"Digite seu email"}
                tipo={"email"}
              ></Input>
              <Input
                value={codigoUnico}
                onChange={(e) => setCodigoUnico(e.target.value)}
                label={"Código único*"}
                required={true}
                placeholder={"Digite seu código único"}
                tipo={"text"}
              ></Input>

              <Alert>
                Caso não saiba seu código único consulte um administrador do
                sistema
              </Alert>

              <div className="d-flex justify-content-end gap-2 mt-4">
                <BotaoOutline color="var(--blue)" onClick={cancelar}>
                  Cancelar
                </BotaoOutline>
                <BotaoComFundo type="submit" color="var(--blue)">
                  Próximo
                </BotaoComFundo>
              </div>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}
