import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Controller, useForm } from "react-hook-form";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import styles from "./CadastroProjeto.module.css";

import { useNavigate, useParams } from "react-router";
import { BotaoComFundo } from "../../../components/Botoes/BotaoComFundo";
import { BotaoOutline } from "../../../components/Botoes/BotaoOutline";
import { Select } from "../../../components/Select/Select";
import "./CadastroProjeto.module.css";

export function CadastroProjeto(props) {
  const { id } = useParams();
  const { handleSubmit, control, setValue } = useForm();
  const navigate = useNavigate();

  const [tipoSelectedOption, setTipoSelectedOption] = useState("");
  const [estadoSelectedOption, setEstadoSelectedOption] = useState("");
  const optionsTipoProjeto = [
    "Projeto de extensão",
    "TCC",
    "Mestrado",
    "Doutorado",
    "IC",
    "Atividade Orientada de Ensino",
    "Estágio",
  ];

  const optionsEstado = ["Em andamento", "Concluído", "Descontinuado"];
  useEffect(() => {
    if (id) {
      fetch(`http://localhost:8080/api/v1/projetos/${id}`)
        .then((resposta) => resposta.json())
        .then((data) => {
          // Use setValue para definir os valores iniciais dos campos
          setValue("nome", data.nome);
          setValue("tipo", data.tipo);
          setValue("status", data.status);
          setValue("inicio", new Date(data.inicio));
          setValue("termino", new Date(data.termino));
          setValue("descricao", data.descricao);
        })
        .catch((erro) => console.log(erro));
    }
  }, [id, setValue]);

  function cancelar() {
    navigate("/projetos");
  }

  const onSubmit = (data) => {
    data.inicio = data.inicio.toISOString().split("T")[0];
    data.termino = data.termino.toISOString().split("T")[0];
    data.status = estadoSelectedOption;
    data.tipo = tipoSelectedOption;

    if (id) {
      fetch(`http://localhost:8080/api/v1/projetos/${id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((resposta) => navigate("/projetos"))
        .catch((erro) => console.log(erro));
    } else {
      fetch("http://localhost:8080/api/v1/projetos", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((resposta) => navigate("/projetos"))
        .catch((erro) => console.log(erro));
    }
  };

  return (
    <Form
      className={`d-flex justify-content-center flex-column form-container`}
      style={{ width: "70vw", margin: "40px auto", padding: "30px" }}
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="mb-3">
        <h1 style={{ fontFamily: "Inter", fontWeight: "bold" }}>Sobre</h1>
        <br></br>
        <Form.Label className="inter-bold">Título do Projeto</Form.Label>
        <Controller
          name="nome"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <Form.Control {...field} className="inter-bold" />
          )}
        />
      </div>
      <div className="mb-3">
        <Form.Label className="inter-bold">Tipo do Projeto</Form.Label>
        <Select
          options={optionsTipoProjeto}
          handleOptionChange={(e) => {
            setTipoSelectedOption(e.target.value);
          }}
          selectedOption={tipoSelectedOption}
        />
      </div>
      <div className="mb-3">
        <Form.Label className="inter-bold">Estado do Projeto</Form.Label>
        <Select
          options={optionsEstado}
          handleOptionChange={(e) => {
            setEstadoSelectedOption(e.target.value);
          }}
          selectedOption={estadoSelectedOption}
        />
      </div>
      <div className="mb-3 d-flex justify-content-between">
        <div className="col">
          <Form.Label className="inter-bold">Data Início</Form.Label>
          <div className="input-group">
            <Controller
              name="inicio"
              control={control}
              defaultValue={null}
              render={({ field }) => (
                <DatePicker
                  {...field}
                  dateFormat="dd/MM/yyyy"
                  className="form-control inter-bold"
                  selected={field.value || null}
                  onChange={(date) => field.onChange(date)}
                />
              )}
            />
            <span className="input-group-text inter-bold">
              <FontAwesomeIcon icon={faCalendar} />
            </span>
          </div>
        </div>
        <div className="col">
          <div className={styles["align-right"]}>
            <Form.Label className="inter-bold">Data Fim</Form.Label>
          </div>
          <div className={`input-group ${styles["align-right"]}`}>
            <Controller
              name="termino"
              control={control}
              defaultValue={null}
              render={({ field }) => (
                <DatePicker
                  {...field}
                  dateFormat="dd/MM/yyyy"
                  className="form-control inter-bold"
                  selected={field.value || null}
                  onChange={(date) => field.onChange(date)}
                />
              )}
            />
            <span className="input-group-text inter-bold">
              <FontAwesomeIcon icon={faCalendar} />
            </span>
          </div>
        </div>
      </div>
      <div className="mb-3" style={{ maxHeight: "150px", overflowY: "auto" }}>
        <Form.Label className="inter-bold">Descrição do Projeto</Form.Label>
        <Controller
          name="descricao"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <ReactQuill
              {...field}
              modules={{
                toolbar: {
                  container: [
                    [{ header: "1" }, { header: "2" }, { font: [] }],
                    [{ list: "ordered" }, { list: "bullet" }],
                    ["bold", "italic", "underline"],
                    ["link", "image"],
                    [{ align: [] }],
                    ["clean"],
                    ["imageUploader"],
                  ],
                },
              }}
            />
          )}
        />
      </div>

      <div className="d-flex justify-content-end gap-2 mt-4">
        <BotaoOutline color="var(--blue)" onClick={cancelar}>
          Cancelar
        </BotaoOutline>
        <BotaoComFundo type="submit" color="var(--blue)">
          Salvar
        </BotaoComFundo>
      </div>
    </Form>
  );
}
