import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Controller, useForm } from "react-hook-form";
import { BsPlusCircle } from "react-icons/bs";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import styles from "./CadastroProjeto.module.css";

import { useNavigate, useParams } from "react-router";
import { BotaoComFundo } from "../../../components/Botoes/BotaoComFundo";
import { BotaoOutline } from "../../../components/Botoes/BotaoOutline";
import { Select } from "../../../components/Select/Select";
import "./CadastroProjeto.module.css";
import { ModalTipos } from "../../gerenciador/ModalTipos";

export function CadastroProjeto() {
  const { id } = useParams();
  const { handleSubmit, control, setValue } = useForm();
  const navigate = useNavigate();

  const [tipoSelectedOption, setTipoSelectedOption] = useState("");
  const [estadoSelectedOption, setEstadoSelectedOption] = useState("");
  const [optionsTipoProjeto, setOptionsTipoProjeto] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [modoEdicao, setModoEdicao] = useState(false);

  const handleOpenAdicionarModal = () => {
    setModoEdicao(false);
    setShowModal(true);
  };

  const optionsEstado = ["Em andamento", "Concluído", "Descontinuado"];
  useEffect(() => {
    obterTiposDeProjeto();
    if (id) {
      fetch(`http://localhost:8080/api/v1/projetos/${id}`)
        .then((resposta) => resposta.json())
        .then((data) => {
          setValue("nome", data.nome);
          setValue("inicio", new Date(data.inicio));
          setValue("termino", new Date(data.termino));
          setValue("descricao", data.descricao);
          setTipoSelectedOption(data.tipoProjeto.tipo);
          setEstadoSelectedOption(data.status);
        })
        .catch((erro) => console.log(erro));
    }
  }, [id, setValue]);

  function obterTiposDeProjeto() {
    fetch("http://localhost:8080/api/v1/tipoProjeto/listagem/ativos", {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((resposta) => resposta.json())
      .then((data) => {
        let mapeamento = data.map((tipoProjeto) => tipoProjeto.nome);
        setOptionsTipoProjeto(mapeamento);
      })
      .catch((erro) => console.log(erro));
  }

  function cancelar() {
    navigate("/projetos");
  }

  const onSubmit = (data) => {
    data.inicio = data.inicio.toISOString().split("T")[0];
    data.termino = data.termino.toISOString().split("T")[0];
    data.status = estadoSelectedOption;
    data.tipoProjeto = tipoSelectedOption;

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

  function salvarTipoProjeto(tipoProjeto) {
    fetch("http://localhost:8080/api/v1/tipoProjeto/", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(tipoProjeto),
    })
      .then(() => obterTiposDeProjeto())
      .catch((erro) => console.log(erro));
  }

  return (
    <>
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
        <div className="mb-3 row">
          <Form.Label className="inter-bold">Tipo do Projeto</Form.Label>
          <div className="col-md-10 col-12 mb-2">
            <Select
              options={optionsTipoProjeto}
              handleOptionChange={(e) => {
                setTipoSelectedOption(e.target.value);
              }}
              selectedOption={tipoSelectedOption}
            />
          </div>
          <div className="col-md-2 col-12 mb-2">
            <BotaoOutline
              color="var(--blue)"
              style={{
                fontSize: "0.8em", // Ajuste de tamanho
                padding: "5px 8px", // Ajuste de padding
              }}
              onClick={handleOpenAdicionarModal}
            >
              <BsPlusCircle style={{ marginRight: "-3px" }} /> Adicionar
            </BotaoOutline>
          </div>
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

      <ModalTipos
        titulo={"Tipo de Projeto"}
        salvar={salvarTipoProjeto}
        showModal={showModal}
        setShowModal={setShowModal}
        modoEdicao={modoEdicao}
        itemSelecionado={null}
      />
    </>
  );
}
