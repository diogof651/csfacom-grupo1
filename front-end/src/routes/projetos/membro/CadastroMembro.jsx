import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import "react-datepicker/dist/react-datepicker.css";
import { useForm } from "react-hook-form";
import "react-quill/dist/quill.snow.css";
import { useNavigate, useParams } from "react-router";
import { BotaoComFundo } from "../../../components/Botoes/BotaoComFundo";
import { BotaoOutline } from "../../../components/Botoes/BotaoOutline";
import { Input } from "../../../components/Input/Input";
import { format } from "date-fns";

export function CadastroMembro() {
  const navigate = useNavigate();
  const { idProjeto, idMembro } = useParams();
  const { handleSubmit } = useForm();
  const [ativo, setAtivo] = useState(true);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [dataIngresso, setDataIngresso] = useState("");
  const [dataTermino, setDataTermino] = useState("");
  const [tiposDePapel, setTiposDePapel] = useState([]);
  const [tiposDeVinculo, setTiposDeVinculo] = useState([]);
  const [papeisSelecionados, setPapeisSelecionados] = useState([]);
  const [vinculosSelecionados, setVinculosSelecionados] = useState([]);

  useEffect(() => {
    if (tiposDePapel.length === 0) {
      obterTiposDeVinculo();
    }
    if (tiposDeVinculo.length === 0) {
      obterTiposDePapel();
    }

    if (idMembro) {
      fetch(`http://localhost:8080/api/v1/membros/${idMembro}/`, {
        method: "GEt",
        headers: {
          "Content-type": "application/json",
        },
      })
        .then((resposta) => resposta.json())
        .then((data) => {
          setAtivo(data.ativo);
          setNome(data.usuario.nome);
          setEmail(data.usuario.email);
          setDataIngresso(
            new Date(data.dataIngresso).toISOString().split("T")[0]
          );
          if (data.dataTermino) {
            setDataTermino(
              new Date(data.dataTermino).toISOString().split("T")[0]
            );
          }
          setPapeisSelecionados(data.papeis);
          setVinculosSelecionados(data.vinculos);
        })
        .catch((erro) => console.log(erro));
    }
  }, [tiposDePapel, tiposDeVinculo, idMembro]);

  const toggleSelecionado = (item, setListaSelecionada) => {
    setListaSelecionada((listaSelecionada) =>
      listaSelecionada.includes(item)
        ? listaSelecionada.filter((i) => i !== item)
        : [...listaSelecionada, item]
    );
  };

  function obterTiposDePapel() {
    fetch("http://localhost:8080/api/v1/tipoPapel/listagem/", {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((resposta) => resposta.json())
      .then((data) => {
        setTiposDePapel(data);
      })
      .catch((erro) => console.log(erro));
  }

  function obterTiposDeVinculo() {
    fetch("http://localhost:8080/api/v1/tipoVinculo/listagem/", {
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

  const onSubmit = () => {
    const data = {
      dataIngresso: dataIngresso,
      dataTermino: dataTermino,
      nome: nome,
      email: email,
      ativo: ativo,
      papeis: papeisSelecionados,
      vinculos: vinculosSelecionados,
    };

    if (idMembro) {
      fetch(`http://localhost:8080/api/v1/membros/${idMembro}/`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((resposta) => navigate(`/projeto/${idProjeto}`))
        .catch((erro) => console.log(erro));
    } else {
      fetch(
        `http://localhost:8080/api/v1/membros/projeto/${idProjeto}/cadastrar/`,
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(data),
        }
      )
        .then((resposta) => navigate(`/projeto/${idProjeto}`))
        .catch((erro) => console.log(erro));
    }
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
          {idMembro ? "Editar " : "Adicionar"} novo membro
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

          <Form.Label
            style={{ fontWeight: "bold", fontSize: "18px" }}
            className="mt-3"
          >
            Tipo de vinculo
          </Form.Label>

          {tiposDeVinculo.map((vinculo, index) => (
            <Form.Check
              key={index}
              className="mt-3"
              type="checkbox"
              id="ativoCheckbox"
              label={vinculo.nome}
              checked={vinculosSelecionados.some(
                (vinculoSelecionado) => vinculoSelecionado.id == vinculo.id
              )}
              onChange={() =>
                toggleSelecionado(vinculo, setVinculosSelecionados)
              }
            />
          ))}
          <Form.Label
            style={{ fontWeight: "bold", fontSize: "18px" }}
            className="mt-3"
          >
            Tipo de papel
          </Form.Label>

          {tiposDePapel.map((papel, index) => (
            <Form.Check
              key={index}
              className="mt-3"
              type="checkbox"
              id="ativoCheckbox"
              label={papel.nome}
              checked={papeisSelecionados.some(
                (papelSelecionado) => papelSelecionado.id === papel.id
              )}
              onChange={() => toggleSelecionado(papel, setPapeisSelecionados)}
            />
          ))}

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
