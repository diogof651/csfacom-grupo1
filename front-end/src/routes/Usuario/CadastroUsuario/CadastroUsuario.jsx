import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import "react-datepicker/dist/react-datepicker.css";
import "react-quill/dist/quill.snow.css";
import { useNavigate } from "react-router";
import { BotaoComFundo } from "../../../components/Botoes/BotaoComFundo";
import { BotaoOutline } from "../../../components/Botoes/BotaoOutline";
import { Input } from "../../../components/Input/Input";

export function CadastroUsuario() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [ativo, setAtivo] = useState(true);

  const navigate = useNavigate();
  const onSubmit = (e) => {
    e.preventDefault();

    const data = {
      nome: nome,
      email: email,
    };
    fetch("http://localhost:8080/api/v1/usuarios", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((resposta) => navigate("/"))
      .catch((erro) => console.log(erro));
  };
  return (
    <>
      <Container
        className="d-flex flex-column"
        style={{ width: "50vw", marginTop: "40px" }}
      >
        <h1
          style={{
            borderBottom: "1px solid #ccc",
            marginBottom: "10px",
            fontWeight: "bold",
            paddingBottom: "5px",
          }}
        >
          Dados Pessoais
        </h1>
        <Form
          className={`d-flex justify-content-center flex-column form-container w-100`}
          onSubmit={onSubmit}
        >
          <Input
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            label={"Nome"}
            required={true}
            placeholder={"Digite seu nome"}
            tipo={"text"}
          ></Input>
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            label={"Email"}
            required={true}
            placeholder={"Digite seu email"}
            tipo={"email"}
          ></Input>
          <Form.Check
            className="mt-3"
            type="checkbox"
            id="ativoCheckbox"
            checked={ativo}
            onChange={(e) => setAtivo(e.target.value)}
            label="Ativo"
          />
          <div className="d-flex justify-content-end gap-2 mt-4">
            <BotaoOutline color="var(--blue)">Cancelar</BotaoOutline>
            <BotaoComFundo type="submit" color="var(--blue)">
              Cadastrar
            </BotaoComFundo>
          </div>
        </Form>
      </Container>
    </>
  );
}
