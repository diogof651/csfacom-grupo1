import React from "react";
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

// Importe a classe 'inter-bold' do arquivo de estilo
import "./CadastroProjeto.module.css";

export function CadastroProjeto(props) {
  const { handleSubmit, control } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    data.inicio = data.inicio.toISOString().split('T')[0]; // Formata a data no formato 'YYYY-MM-DD'
    data.termino = data.termino.toISOString().split('T')[0]; // Formata a data no formato 'YYYY-MM-DD'

    fetch("http://localhost:8080/api/v1/projetos", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((resposta) => console.log(resposta))
      .catch((erro) => console.log(erro));
    console.log(data);
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
          <Controller
            name="tipo"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <Form.Select
                {...field}
                aria-label="Default select example"
                className="inter-bold"
              >
                <option>selecione o tipo do projeto</option>
                <option value="1">Projeto de extensão</option>
                <option value="2">TCC</option>
                <option value="3">Mestrado</option>
                <option value="4">Doutorado</option>
                <option value="5">IC</option>
                <option value="6">Atividade Orientada de Ensino</option>
                <option value="7">Estágio</option>
                <option value="8">Outros</option>
              </Form.Select>
            )}
          />
        </div>
        <div className="mb-3">
          <Form.Label className="inter-bold">Estado do Projeto</Form.Label>
          <Controller
            name="status"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <Form.Select
                {...field}
                aria-label="Default select example"
                className="inter-bold"
              >
                <option>selecione o estado do projeto</option>
                <option value="1">Em andamento</option>
                <option value="2">Concluído</option>
                <option value="3">Descontinuado</option>
              </Form.Select>
            )}
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
