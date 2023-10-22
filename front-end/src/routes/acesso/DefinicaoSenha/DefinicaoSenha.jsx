import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import { useNavigate, useParams } from "react-router";
import Alert from "../../../components/Alert/Alert";

import { useAuth } from "../../../AutorizacaoServico";
import { BotaoComFundo } from "../../../components/Botoes/BotaoComFundo";
import { BotaoOutline } from "../../../components/Botoes/BotaoOutline";
import { Input } from "../../../components/Input/Input";
import "./../PrimeiroAcesso/PrimeiroAcesso.css";

export function DefinicaoSenha() {
  const navigate = useNavigate();
  const { codigoUnico } = useParams();
  const { login } = useAuth();

  const [mensagemErro, setMensagemErro] = useState("");
  const [senha, setSenha] = useState("");
  const [repeticaoSenha, setRepeticaoSenha] = useState("");
  function isSenhaValida(senha) {
    // Verifica se a senha possui pelo menos 10 caracteres
    if (senha.length < 10) return false;

    // Verifica se a senha contém pelo menos 1 letra maiúscula
    if (!/[A-Z]/.test(senha)) return false;

    // Verifica se a senha contém pelo menos 1 letra minúscula
    if (!/[a-z]/.test(senha)) return false;

    // Verifica se a senha contém pelo menos 1 caractere numérico
    if (!/[0-9]/.test(senha)) return false;

    // Verifica se a senha contém pelo menos 1 caractere especial
    if (!/[@!#$%*]/.test(senha)) return false;

    return true;
  }

  const onSubmit = (e) => {
    e.preventDefault();
    if(!(isSenhaValida(senha) && senha === repeticaoSenha)){
      setMensagemErro("Senha fora do padrão estabelecido");
      return;
    }

    const data = {
      codigoUnico: codigoUnico,
      senha: senha,
    };

    fetch(`http://localhost:8080/api/v1/usuarios/alterarSenha`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((resposta) => {
        resposta.json().then((dados) => {
          if (dados.resposta === "Informações Incorretas") {
            setMensagemErro(dados.resposta);
          } else {
            login(dados.resposta);
            navigate("/");
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
                Definir Senha
              </h1>

              <Alert>
                A senha deve possuir 10 caracteres, contendo:
                <br></br>- 1 Carácter de letra maiúscula
                <br></br>- 1 Carácter de letra minúscula
                <br></br>- 1 Carácter numérico
                <br></br>- 1 Carácter especial
              </Alert>
              {mensagemErro && <Alert type="erro">{mensagemErro}</Alert>}
              <Input
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                label={"Senha*"}
                required={true}
                placeholder={"Digite a senha"}
                tipo={"password"}
              ></Input>
              <Input
                value={repeticaoSenha}
                onChange={(e) => setRepeticaoSenha(e.target.value)}
                label={"Repita a senha*"}
                required={true}
                placeholder={"Repita a senha"}
                tipo={"password"}
              ></Input>

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
