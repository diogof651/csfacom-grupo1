import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router";
import Alert from "../../../components/Alert/Alert";

import { BotaoComFundo } from "../../../components/Botoes/BotaoComFundo";
import { BotaoOutline } from "../../../components/Botoes/BotaoOutline";
import { Input } from "../../../components/Input/Input";

export function DefinicaoSenha() {
  const navigate = useNavigate();

  const [senha, setSenha] = useState("");
  const [repeticaoSenha, setRepeticaoSenha] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    // Não permitir senhas que estejam fora do padrão estabelecido
    
    const data = {
      senha: senha,
    };

    // fazer requisição na api
  };

  function cancelar() {
    navigate("/");
  }

  return (
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
  );
}
