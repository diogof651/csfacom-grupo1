import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import FormCheck from "react-bootstrap/FormCheck";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Controller, useForm } from "react-hook-form";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import styles from "./CadastroNoticia.module.css";

import { useNavigate, useParams } from "react-router";
import "./CadastroNoticia.module.css";
import { BotaoOutline } from "../../../components/Botoes/BotaoOutline";

export function CadastroNoticia(props) {
  const { id } = useParams();
  const { handleSubmit, control, setValue } = useForm();
  const navigate = useNavigate();

  const [selectedOption, setSelectedOption] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [anexos, setAnexos] = useState([]); // Lista de arquivos anexados
  const [thumbnails, setThumbnails] = useState([]); // Lista de thumbnails

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:8080/api/v1/noticias/${id}`)
        .then((resposta) => resposta.json())
        .then((data) => {
          setValue("nome", data.nome);
          setValue("tipo", data.tipo);
          setValue("status", data.status);
          setValue("inicio", new Date(data.inicio));
          setValue("termino", new Date(data.termino));
          setValue("descricao", data.descricao);
          setSelectedOption(data.tipo);
          setShowDatePicker(data.tipo === "Agendada");
          // Defina os arquivos anexados a partir dos dados recuperados, se aplicável
          setAnexos(data.anexos || []);
          // Defina as thumbnails a partir dos dados recuperados, se aplicável
          setThumbnails(data.thumbnails || []);
        })
        .catch((erro) => console.log(erro));
    }
  }, [id, setValue]);

  const handleRadioChange = (option) => {
    setSelectedOption(option);
    setShowDatePicker(option === "Agendada");
  };

  const onSubmit = (data) => {
    data.inicio = data.inicio.toISOString().split("T")[0];
    data.termino = data.termino.toISOString().split("T")[0];
    if (id) {
      fetch(`http://localhost:8080/api/v1/noticias/${id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((resposta) => navigate("/"))
        .catch((erro) => console.log(erro));
    } else {
      fetch("http://localhost:8080/api/v1/noticias", {
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

  // Função para remover um arquivo anexado
  const handleRemoveAnexo = (index) => {
    const updatedAnexos = anexos.filter((_, i) => i !== index); // Crie uma nova lista excluindo o anexo com o índice especificado
    setAnexos(updatedAnexos);
  };

  // Função para remover uma thumbnail
  const handleRemoveThumbnail = (index) => {
    const updatedThumbnails = thumbnails.filter((_, i) => i !== index); // Crie uma nova lista excluindo a thumbnail com o índice especificado
    setThumbnails(updatedThumbnails);
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
        <div className="mb-3 d-flex justify-content-between align-items-center">
          <div>
            <h1 style={{ fontFamily: "Inter", fontWeight: "bold" }}>
              Editar Notícia
            </h1>
          </div>
          <div className="d-flex align-items-center">
            <FormCheck
              type="switch"
              id="custom-switch"
              className="inter-bold"
              style={{ marginLeft: "10px" }}
              label=""
            />
            <span
              style={{
                fontSize: "14px",
                marginLeft: "-2px",
                marginBottom: "2,3px",
              }}
            >
              Em destaque
            </span>
          </div>
        </div>
        <div className="mb-3">
          <Form.Label className="inter-bold">Título*</Form.Label>
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
          <Form.Label className="inter-bold">Publicação*</Form.Label>
          <div key={`default-radio-1`} className="mb-3">
            <FormCheck
              type="radio"
              id={`default-radio-1`}
              label={`Imediata`}
              checked={selectedOption === "Imediata"}
              onChange={() => handleRadioChange("Imediata")}
            />
          </div>
          <div key={`default-radio-2`} className="mb-3">
            <FormCheck
              type="radio"
              id={`default-radio-2`}
              label={`Rascunho`}
              checked={selectedOption === "Rascunho"}
              onChange={() => handleRadioChange("Rascunho")}
            />
          </div>
          <div key={`default-radio-3`} className="mb-3">
            <FormCheck
              type="radio"
              id={`default-radio-3`}
              label={`Agendada`}
              checked={selectedOption === "Agendada"}
              onChange={() => handleRadioChange("Agendada")}
            />
          </div>
        </div>

        {showDatePicker && (
          <div className="mb-3">
            <Form.Label className="inter-bold">Data Agendada</Form.Label>
            <div className="input-group">
              <Controller
                name="dataAgendada"
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
        )}

        <div className="mb-3" style={{ maxHeight: "150px", overflowY: "auto" }}>
          <Form.Label className="inter-bold">Conteúdo*</Form.Label>
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

        <div className="mb-3 d-flex justify-content-between align-items-center">
          <Form.Label className="inter-bold fs-5">Anexar Arquivos</Form.Label>
          <label
            className="btn btn-primary inter-bold"
            style={{
              backgroundColor: "transparent",
              color: "var(--blue)",
              border: "1px solid var(--blue)",
              padding: "5px",
              height: "40px",
            }}
          >
            Escolher Arquivo
            <input
              type="file"
              name="anexos"
              multiple
              className="d-none"
              onChange={(e) => {
                const selectedFiles = Array.from(e.target.files);
                const updatedAnexos = [...anexos];
                selectedFiles.forEach((file) => {
                  updatedAnexos.push({ nome: file.name });
                });
                setAnexos(updatedAnexos);
              }}
            />
          </label>
        </div>

        {/* Lista de arquivos anexados */}
        <ul>
          {anexos.map((anexo, index) => (
            <li key={index} className="mb-2">
              {anexo.nome} {/* Exiba o nome do arquivo */}
              <button
                type="button"
                className="btn btn-danger btn-sm ms-2"
                onClick={() => handleRemoveAnexo(index)}
              >
                Remover
              </button>{" "}
              {/* Botão para remover o arquivo */}
            </li>
          ))}
        </ul>

        <div className="mb-3 d-flex justify-content-between align-items-center">
          <Form.Label className="inter-bold fs-5">Thumbnails</Form.Label>
          <label
            className="btn btn-primary inter-bold"
            style={{
              backgroundColor: "transparent",
              color: "var(--blue)",
              border: "1px solid var(--blue)",
              padding: "5px",
              height: "40px",
            }}
          >
            Escolher Imagem
            <input
              type="file"
              name="thumbnails"
              multiple
              className="d-none"
              onChange={(e) => {
                const selectedFiles = Array.from(e.target.files);
                const updatedThumbnails = [...thumbnails];
                selectedFiles.forEach((file) => {
                  updatedThumbnails.push({ nome: file.name });
                });
                setThumbnails(updatedThumbnails);
              }}
            />
          </label>
        </div>

        {/* Lista de thumbnails */}
        <ul>
          {thumbnails.map((thumbnail, index) => (
            <li key={index} className="mb-2">
              {thumbnail.nome} {/* Exiba o nome da thumbnail */}
              <button
                type="button"
                className="btn btn-danger btn-sm ms-2"
                onClick={() => handleRemoveThumbnail(index)}
              >
                Remover
              </button>{" "}
              {/* Botão para remover a thumbnail */}
            </li>
          ))}
        </ul>

        <div className="text-end mt-3">
          <div className="justify-content-between">
            <button
              type="button"
              className="btn btn-secondary me-2 inter-bold"
            >
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
