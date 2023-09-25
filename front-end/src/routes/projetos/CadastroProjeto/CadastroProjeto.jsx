import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
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
import "./CadastroProjeto.module.css";
import { Select } from "../../../components/Select/Select";

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
          console.log(data);
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

  const onSubmit = (data) => {
    data.inicio = data.inicio.toISOString().split("T")[0]; // Formata a data no formato 'YYYY-MM-DD'
    data.termino = data.termino.toISOString().split("T")[0]; // Formata a data no formato 'YYYY-MM-DD'
    data.status = estadoSelectedOption;
    data.tipo = tipoSelectedOption;
    console.log(data);
    if (id) {
      fetch(`http://localhost:8080/api/v1/projetos/${id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((resposta) => navigate("/"))
        .catch((erro) => console.log(erro));
    } else {
      fetch("http://localhost:8080/api/v1/projetos", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((resposta) => navigate("/"))
        .catch((erro) => console.log(erro));
    }
  };

  return (
    <Container
      className={`${styles.container} d-flex justify-content-center`}
      style={{ height: "100%" }}
    >
      <Form
        className={`d-flex justify-content-center flex-column form-container`}
        style={{ width: "45vw" }}
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
                className={`${styles["custom-textarea"]} inter-bold`}
              />
            )}
          />
        </div>
        <div className="text-end mt-3">
          <div className="justify-content-between">
            <button type="button" className="btn btn-secondary me-2 inter-bold">
              Cancelar
            </button>
            <button
              type="submit"
              className="btn btn-primary inter-bold"
              style={{ backgroundColor: "var(--blue)" }}
            >
              Salvar
            </button>
          </div>
        </div>
      </Form>
    </Container>
  );
}
