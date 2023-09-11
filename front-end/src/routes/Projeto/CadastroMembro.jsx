import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import "react-datepicker/dist/react-datepicker.css";
import "react-quill/dist/quill.snow.css";
import { BotaoComFundo } from "../../components/Botoes/BotaoComFundo";
import { BotaoOutline } from "../../components/Botoes/BotaoOutline";
import { Input } from "../../components/Input/Input";
import { FotoPerfil } from "../../components/FotoPerfil/FotoPerfil";

export function CadastroMembro() {
  const [ativo, setAtivo] = useState(true);

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

  const [tiposDeVinculos, setTiposDeVinculos] = useState([
    { label: "Alunos de Atividades Orientada de Ensino", checked: false },
    { label: "Alunos de Doutorado", checked: false },
    { label: "Alunos de TCC", checked: false },
    { label: "Alunos de Mestrado", checked: false },
    { label: "Bolsistas", checked: false },
    { label: "Estagiários", checked: false },
    { label: "Pesquisador colaborador", checked: false },
    { label: "Voluntários", checked: false },
    { label: "Docente", checked: false },
    { label: "Coordenador", checked: false },
  ]);

  const [tiposDePapeis, setTipoDePapeis] = useState([
    { label: "Gerente", checked: false },
    { label: "Designer", checked: false },
    { label: "Desenvolvedor Back-end", checked: false },
    { label: "Desenvolvedor Front-end", checked: false },
  ]);

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
          //   onSubmit=""
        >
          <div className="mx-auto mt-2 mb-2">
            <FotoPerfil></FotoPerfil>
          </div>
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
          <div className="d-flex gap-4">
            <Input
              label={"Data de ingresso"}
              required={true}
              tipo={"date"}
            ></Input>

            <Input
              label={"Data de termino"}
              required={true}
              tipo={"date"}
              disabled={ativo}
            ></Input>
          </div>

          <Input
            label={"Nome"}
            required={true}
            placeholder={"Digite seu nome"}
            tipo={"text"}
          ></Input>
          <Input
            label={"Email"}
            required={true}
            placeholder={"Digite seu email"}
            tipo={"email"}
          ></Input>

          <Form.Label
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
          ))}
          <Form.Label
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
          ))}

          <div className="d-flex justify-content-end gap-2 mt-4 mb-4">
            <BotaoOutline color="var(--blue)">Cancelar</BotaoOutline>
            <BotaoComFundo color="var(--blue)">Cadastrar</BotaoComFundo>
          </div>
        </Form>
      </Container>
    </>
  );
}
