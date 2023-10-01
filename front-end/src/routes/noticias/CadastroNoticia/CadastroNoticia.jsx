import { faImage, faPaperclip } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Quill from "quill";
import ImageUploader from "quill-image-uploader";
import "quill/dist/quill.snow.css";
import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import FormCheck from "react-bootstrap/FormCheck";
import "react-datepicker/dist/react-datepicker.css";
import { Controller, useForm } from "react-hook-form";
import { BsTrash3 } from "react-icons/bs";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate, useParams } from "react-router";
import { BotaoComFundo } from "../../../components/Botoes/BotaoComFundo";
import { BotaoOutline } from "../../../components/Botoes/BotaoOutline";
import { Input } from "../../../components/Input/Input";
import "./CadastroNoticia.module.css";

Quill.register("modules/imageUploader", ImageUploader);

export function CadastroNoticia() {
  const { id } = useParams();
  const { handleSubmit, control, setValue } = useForm();
  const navigate = useNavigate();

  const [emDestaque, setEmDestaque] = useState(false);
  const [dataPublicacao, setDataPublicacao] = useState("");
  const [estadoSelecionado, setEstadoSelecionado] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [anexos, setAnexos] = useState([]);
  const [thumbnail, setThumbnail] = useState(null);
  const [hasSelectedAnexo, setHasSelectedAnexo] = useState(false);
  const [hasSelectedThumbnail, setHasSelectedThumbnail] = useState(false);

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:8080/api/v1/noticias/${id}`)
        .then((resposta) => resposta.json())
        .then((data) => {
          setValue("titulo", data.titulo);
          setValue("conteudo", data.conteudo);
          setEstadoSelecionado(data.estado);
          setEmDestaque(data.emDestaque);

          if (data.anexos.length > 0) {
            setAnexos(data.anexos);
            setHasSelectedAnexo(true);
          }

          if (data.thumbnail != null) {
            setThumbnail({ titulo: "thumb.png", conteudo: data.thumbnail });
            setHasSelectedThumbnail(true);
          }

          if (data.estado === "Agendada") {
            setShowDatePicker(true);
            const formattedDataPublicacao = new Date(data.dataPublicacao)
              .toISOString()
              .split("T")[0];
            setDataPublicacao(formattedDataPublicacao);
          }
        })
        .catch((erro) => console.log(erro));
    }
  }, [id, setValue, setEstadoSelecionado]);

  const handleRadioChange = (option) => {
    if (option !== estadoSelecionado) {
      setEstadoSelecionado(option);
      setShowDatePicker(option === "Agendada");
    }
  };

  const onSubmit = (data) => {
    data.autor_id = 1; // TO-DO: mudar para usuario logado
    data.estado = estadoSelecionado;
    data.emDestaque = emDestaque;
    data.anexos = anexos ?? null;
    data.thumbnail = thumbnail ? thumbnail.conteudo : null;
    data.dataPublicacao =
      estadoSelecionado == "Agendada" ? dataPublicacao : null;

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

  const handleRemoveAnexo = (index) => {
    const updatedAnexos = [...anexos];
    updatedAnexos.splice(index, 1);
    setAnexos(updatedAnexos);
    if (updatedAnexos.length === 0) {
      setHasSelectedAnexo(false);
    }
  };

  const handleRemoveThumbnail = () => {
    setThumbnail(null);
    setHasSelectedThumbnail(false);
  };

  function converterParaBase64(selectedFile, callback) {
    const reader = new FileReader();
    reader.onload = function (event) {
      const base64String = event.target.result.split(",")[1];
      callback(base64String);
    };
    reader.readAsDataURL(selectedFile);
  }

  const handleFileInputChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    const updatedAnexos = [...anexos];

    const processFile = (file) => {
      converterParaBase64(file, (conteudoBase64) => {
        updatedAnexos.push({
          titulo: file.name,
          conteudo: conteudoBase64,
        });
        setAnexos(updatedAnexos);

        if (!hasSelectedAnexo) {
          setHasSelectedAnexo(true);
        }
      });
    };

    selectedFiles.forEach(processFile);
  };

  const handleThumbnailInputChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      if (
        selectedFile.type === "image/png" ||
        selectedFile.type === "image/jpeg"
      ) {
        const processFile = (file) => {
          converterParaBase64(file, (conteudoBase64) => {
            setThumbnail({ titulo: file.name, conteudo: conteudoBase64 });
          });
        };

        processFile(selectedFile);
        setHasSelectedThumbnail(true);
      } else {
        alert("Por favor, selecione um arquivo PNG ou JPEG válido.");
      }
    }
  };

  return (
    <Form
      className={`d-flex justify-content-center flex-column form-container`}
      style={{ width: "70vw", margin: "40px auto", padding: "30px" }}
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
            style={{ marginLeft: "10px" }}
            label="Em destaque"
            checked={emDestaque}
            onChange={() => setEmDestaque(!emDestaque)}
          />
        </div>
      </div>
      <div className="mb-3">
        <Form.Label style={{ fontWeight: "bold", fontSize: "18px" }}>
          Título*
        </Form.Label>
        <Controller
          name="titulo"
          control={control}
          defaultValue=""
          render={({ field }) => <Form.Control {...field} />}
        />
      </div>
      <div className="mb-3">
        <Form.Label style={{ fontWeight: "bold", fontSize: "18px" }}>
          Conteúdo*
        </Form.Label>

        <Controller
          name="conteudo"
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
      <div className="mb-3">
        <Form.Label style={{ fontWeight: "bold", fontSize: "18px" }}>
          Publicação*
        </Form.Label>
        <div key={`default-radio-1`} className="mb-3">
          <FormCheck
            type="radio"
            id={`default-radio-1`}
            label={`Imediata`}
            checked={estadoSelecionado === "Imediata"}
            onChange={() => handleRadioChange("Imediata")}
          />
        </div>
        <div key={`default-radio-2`} className="mb-3">
          <FormCheck
            type="radio"
            id={`default-radio-2`}
            label={`Rascunho`}
            checked={estadoSelecionado === "Rascunho"}
            onChange={() => handleRadioChange("Rascunho")}
          />
        </div>
        <div key={`default-radio-3`} className="mb-3">
          <FormCheck
            type="radio"
            id={`default-radio-3`}
            label={`Agendada`}
            checked={estadoSelecionado === "Agendada"}
            onChange={() => handleRadioChange("Agendada")}
          />
        </div>
      </div>

      {showDatePicker && (
        <div className="mb-3">
          <Input
            value={dataPublicacao}
            onChange={(e) => setDataPublicacao(e.target.value)}
            label={"Data para publicação"}
            required={true}
            placeholder={""}
            tipo={"date"}
          ></Input>
        </div>
      )}

      <div className="mb-3 d-flex justify-content-between align-items-center">
        <Form.Label style={{ fontWeight: "bold", fontSize: "20px" }}>
          Anexos
        </Form.Label>
        <label
          className="btn btn-primary inter-bold"
          style={{
            backgroundColor: "transparent",
            color: "var(--blue)",
            border: "1px solid var(--blue)",
            padding: "5px",
            height: "40px",
            display: "flex",
            alignItems: "center",
          }}
        >
          Escolher Arquivo
          <input
            type="file"
            name="anexos"
            multiple
            className="d-none"
            accept="application/pdf"
            onChange={handleFileInputChange}
          />
        </label>
      </div>

      <ul className="list-unstyled">
        {anexos.map((anexo, index) => (
          <li
            key={index}
            className="d-flex align-items-center mb-2"
            style={{
              backgroundColor: "#f2f2f2",
              padding: "8px",
              marginBottom: "8px",
              borderRadius: "7px",
            }}
          >
            <span className="file-icon">
              <FontAwesomeIcon icon={faPaperclip} />
            </span>{" "}
            <span style={{ marginRight: "8px" }}></span>
            <span>{anexo.titulo}</span>
            <div className="ms-auto">
              <button
                type="button"
                className="btn btn-link text-reset"
                onClick={() => handleRemoveAnexo(index)}
              >
                <BsTrash3 className="icon" style={{ color: "var(--red)" }} />
              </button>
            </div>
          </li>
        ))}
      </ul>

      {!hasSelectedAnexo && (
        <div
          className="mb-2 d-flex align-items-center"
          style={{
            backgroundColor: "#f2f2f2",
            padding: "8px",
            marginTop: "-30px",
            borderRadius: "7px",
          }}
        >
          <FontAwesomeIcon icon={faPaperclip} className="me-2" />
          Nenhum anexo selecionado
        </div>
      )}

      <div className="mb-3 d-flex justify-content-between align-items-center">
        <Form.Label style={{ fontWeight: "bold", fontSize: "20px" }}>
          Thumbnail
        </Form.Label>
        <label
          className="btn btn-primary inter-bold"
          style={{
            backgroundColor: "transparent",
            color: "var(--blue)",
            border: "1px solid var(--blue)",
            padding: "5px",
            height: "40px",
            display: "flex",
            alignItems: "center",
          }}
        >
          Escolher Imagem
          <input
            type="file"
            name="thumbnail"
            accept=".png,.jpeg,.jpg"
            className="d-none"
            onChange={handleThumbnailInputChange}
          />
        </label>
      </div>

      {thumbnail && (
        <ul className="list-unstyled">
          <li
            style={{
              backgroundColor: "#f2f2f2",
              padding: "8px",
              marginBottom: "8px",
              borderRadius: "7px",
            }}
          >
            <div className="d-flex justify-content-between">
              <span className="file-icon">
                <FontAwesomeIcon icon={faImage} /> {thumbnail.titulo}
              </span>

              <button
                type="button"
                className="btn btn-link text-reset"
                onClick={handleRemoveThumbnail}
              >
                <BsTrash3 className="icon" style={{ color: "var(--red)" }} />
              </button>
            </div>
            <div className="mt-2">
              <img
                src={`data:image/jpeg;base64,${thumbnail.conteudo}`} // Certifique-se de que o tipo da imagem esteja correto
                alt={thumbnail.titulo}
                style={{ maxWidth: "200px", maxHeight: "200px" }} // Ajuste o tamanho conforme necessário
              />
            </div>
          </li>
        </ul>
      )}

      {!hasSelectedThumbnail && (
        <div
          className="mb-2 d-flex align-items-center"
          style={{
            backgroundColor: "#f2f2f2",
            padding: "8px",
            marginTop: "-15px",
            borderRadius: "7px",
          }}
        >
          <FontAwesomeIcon icon={faImage} className="me-2" />
          Nenhuma imagem selecionada
        </div>
      )}

      <div className="d-flex justify-content-end gap-2 mt-4">
        <BotaoOutline color="var(--blue)">Cancelar</BotaoOutline>
        <BotaoComFundo type="submit" color="var(--blue)">
          Salvar
        </BotaoComFundo>
      </div>
    </Form>
  );
}
