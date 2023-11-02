import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import "react-datepicker/dist/react-datepicker.css";
import { useForm } from "react-hook-form";
import "react-quill/dist/quill.snow.css";
import { useNavigate } from "react-router";
import { BotaoComFundo } from "../../../components/Botoes/BotaoComFundo";
import { BotaoOutline } from "../../../components/Botoes/BotaoOutline";
import { Input } from "../../../components/Input/Input";

export function CadastroMembro() {
  const navigate = useNavigate();
  const { handleSubmit } = useForm();
  const [ativo, setAtivo] = useState(true);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [dataIngresso, setDataIngresso] = useState("");
  const [dataTermino, setDataTermino] = useState("");

  // Função para lidar com a mudança em uma lista de checkboxes com base no índice
  const handleCheckboxChange = (index, lista, setLista) => {
    const updatedList = [...lista];
    updatedList[index].checked = !updatedList[index].checked;
    setLista(updatedList);
  };

  // Função para obter os valores selecionados em uma lista de checkboxes
  const getValoresSelecionados = (lista) => {
    return lista
      .filter((checkbox) => checkbox.checked)
      .map((checkbox) => checkbox.label);
  };

  // const [tiposDeVinculos, setTiposDeVinculos] = useState([
  //   { label: "Alunos de Atividades Orientada de Ensino", checked: false },
  //   { label: "Alunos de Doutorado", checked: false },
  //   { label: "Alunos de TCC", checked: false },
  //   { label: "Alunos de Mestrado", checked: false },
  //   { label: "Bolsistas", checked: false },
  //   { label: "Estagiários", checked: false },
  //   { label: "Pesquisador colaborador", checked: false },
  //   { label: "Voluntários", checked: false },
  //   { label: "Docente", checked: false },
  //   { label: "Coordenador", checked: false },
  // ]);

  // const [tiposDePapeis, setTipoDePapeis] = useState([
  //   { label: "Gerente", checked: false },
  //   { label: "Designer", checked: false },
  //   { label: "Desenvolvedor Back-end", checked: false },
  //   { label: "Desenvolvedor Front-end", checked: false },
  // ]);

  const onSubmit = () => {
    const id_projeto = 5;
    const data = {
      dataIngresso: dataIngresso,
      dataTermino: dataTermino,
      nome: nome,
      email: email,
      ativo: ativo,
    };

    // if (id) {
    //   fetch(`http://localhost:8080/api/v1/membros/projeto/${id_projeto}/cadastrar/`, {
    //     method: "PUT",
    //     headers: {
    //       "Content-type": "application/json",
    //     },
    //     body: JSON.stringify(data),
    //   })
    //     .then((resposta) => navigate("/projetos"))
    //     .catch((erro) => console.log(erro));
    // } else {
    fetch(
      `http://localhost:8080/api/v1/membros/projeto/${id_projeto}/cadastrar/`,
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(data),
      }
    )
      .then((resposta) => navigate("/projeto/2"))
      .catch((erro) => console.log(erro));
    //}
  };

  return (
    <>
      <Container
        className="d-flex flex-column"
        style={{ width: "50vw", marginTop: "40px" }}
      >
        <h1
          style={{
            textAlign: "center",
            marginBottom: "10px",
            fontWeight: "bold",
            paddingBottom: "5px",
          }}
        >
          Adicionar novo membro
        </h1>
        <Form
          className={`d-flex justify-content-center flex-column form-container w-100`}
          onSubmit={handleSubmit(onSubmit)}
        >
          <Input
            value={nome}
            label={"Nome"}
            required={true}
            placeholder={"Digite o nome"}
            tipo={"text"}
            onChange={(e) => setNome(e.target.value)}
          ></Input>
          <Input
            value={email}
            label={"Email"}
            required={true}
            placeholder={"Digite o email"}
            tipo={"email"}
            onChange={(e) => setEmail(e.target.value)}
          ></Input>

          <Input
            value={dataIngresso}
            label={"Data de ingresso"}
            required={true}
            tipo={"date"}
            onChange={(e) => setDataIngresso(e.target.value)}
          ></Input>

          <Input
            value={dataTermino}
            label={"Data de termino"}
            required={true}
            tipo={"date"}
            disabled={ativo}
            onChange={(e) => setDataTermino(e.target.value)}
          ></Input>

          <Form.Check
            className="mt-3"
            type="checkbox"
            id="ativoCheckbox"
            label="Ativo"
            defaultChecked={ativo}
            onChange={(e) => {
              setAtivo(e.target.checked);
            }}
          />

          {/* <Form.Label
            style={{ fontWeight: "bold", fontSize: "18px" }}
            className="mt-3"
          >
            Tipo de vinculo
          </Form.Label>

          {tiposDeVinculos.map((vinculo, index) => (
            <Form.Check
              key={index}
              className="mt-3"
              type="checkbox"
              id="ativoCheckbox"
              label={vinculo.label}
              checked={vinculo.checked}
              onChange={() =>
                handleCheckboxChange(index, tiposDeVinculos, setTiposDeVinculos)
              }
            />
          ))} */}
          {/* <Form.Label
            style={{ fontWeight: "bold", fontSize: "18px" }}
            className="mt-3"
          >
            Tipo de papel
          </Form.Label>

          {tiposDePapeis.map((papel, index) => (
            <Form.Check
              key={index}
              className="mt-3"
              type="checkbox"
              id="ativoCheckbox"
              label={papel.label}
              checked={papel.checked}
              onChange={() =>
                handleCheckboxChange(index, tiposDePapeis, setTipoDePapeis)
              }
            />
          ))} */}

          <div className="d-flex justify-content-end gap-2 mt-4 mb-4">
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
