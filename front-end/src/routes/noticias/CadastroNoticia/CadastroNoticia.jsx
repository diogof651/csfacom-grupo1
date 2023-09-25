import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import FormCheck from "react-bootstrap/FormCheck";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Controller, useForm } from "react-hook-form";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { faCalendar, faPaperclip, faImage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { BsTrash3 } from "react-icons/bs";
import { useNavigate, useParams } from "react-router";
import Quill from "quill"; // Importe Quill
import "quill/dist/quill.snow.css";
import ImageUploader from "quill-image-uploader"; // Importe o plugin de upload de imagem
import "./CadastroNoticia.module.css";
import { BotaoOutline } from "../../../components/Botoes/BotaoOutline";

// Registre o plugin de upload de imagem com o Quill
Quill.register("modules/imageUploader", ImageUploader);

export function CadastroNoticia(props) {
  const { id } = useParams();
  const { handleSubmit, control, setValue } = useForm();
  const navigate = useNavigate();

  const [selectedOption, setSelectedOption] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [anexos, setAnexos] = useState([]);
  const [thumbnail, setThumbnail] = useState(null); // Alterado para armazenar apenas uma thumbnail
  const [hasSelectedAnexo, setHasSelectedAnexo] = useState(false);
  const [hasSelectedThumbnail, setHasSelectedThumbnail] = useState(false);

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:8080/api/v1/noticias/${id}`)
        .then((resposta) => resposta.json())
        .then((data) => {
          setValue("titulo", data.titulo);
          setValue("conteudo", data.conteudo);
          setValue("estado", data.estado);
          setSelectedOption(data.tipo);
          setShowDatePicker(data.tipo === "Agendada");
          setAnexos(data.anexos || []);
          // Defina a thumbnail a partir dos dados recuperados, se aplicável
          setThumbnail(data.thumbnails && data.thumbnails[0] ? { nome: data.thumbnails[0].nome } : null);
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

  const handleRemoveAnexo = (index) => {
    const updatedAnexos = [...anexos];
    updatedAnexos.splice(index, 1);
    setAnexos(updatedAnexos);
    if (updatedAnexos.length === 0) {
      setHasSelectedAnexo(false);
    }
  };

  const handleRemoveThumbnail = () => {
    setThumbnail(null); // Remover a thumbnail
    setHasSelectedThumbnail(false); // Definir como false
  };

  const handleFileInputChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    const updatedAnexos = [...anexos];
    selectedFiles.forEach((file) => {
      updatedAnexos.push({ nome: file.name });
    });
    setAnexos(updatedAnexos);

    if (!hasSelectedAnexo) {
      setHasSelectedAnexo(true);
    }
  };

  const handleThumbnailInputChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      // Verifique se o arquivo é PNG ou JPEG
      if (selectedFile.type === 'image/png' || selectedFile.type === 'image/jpeg') {
        setThumbnail({ nome: selectedFile.name });
        setHasSelectedThumbnail(true);
      } else {
        alert('Por favor, selecione um arquivo PNG ou JPEG válido.');
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
        <Form.Label className="inter-bold">Conteúdo*</Form.Label>

        <ReactQuill
          modules={{
            toolbar: {
              container: [
                [{ header: "1" }, { header: "2" }, { font: [] }],
                [{ list: "ordered" }, { list: "bullet" }],
                ["bold", "italic", "underline"],
                ["link", "image"], // Adicione a opção "image" para fazer upload de imagens
                [{ align: [] }],
                ["clean"],
                ["imageUploader"], // Registre o plugin de upload de imagem aqui
              ],
            },
          }}
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
            onChange={handleFileInputChange}
          />
        </label>
      </div>

      {/* Lista de arquivos anexados */}
      <ul className="list-unstyled">
        {anexos.map((anexo, index) => (
          <li key={index} className="d-flex align-items-center mb-2" style={{ backgroundColor: "#f2f2f2", padding: "8px", marginBottom: "8px", borderRadius: "7px" }}>
            <span className="file-icon">
              <FontAwesomeIcon icon={faPaperclip} />
            </span>{" "}
            <span style={{ marginRight: "8px" }}></span>
            <span>{anexo.nome}</span>
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

      {/* Mensagem "Nenhum anexo selecionado" */}
      {!hasSelectedAnexo && (
        <div className="mb-2 d-flex align-items-center" style={{ backgroundColor: "#f2f2f2", padding: "8px", marginTop: "-30px", borderRadius: "7px" }}>
          <FontAwesomeIcon icon={faPaperclip} className="me-2" />
          Nenhum anexo selecionado
        </div>
      )}

      <div className="mb-3 d-flex justify-content-between align-items-center">
        <Form.Label className="inter-bold fs-5">Thumbnail</Form.Label>
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
            accept=".png,.jpeg,.jpg" // Aceitar apenas PNG e JPEG
            className="d-none"
            onChange={handleThumbnailInputChange}
          />
        </label>
      </div>

      {/* Lista de thumbs anexados */}
      {thumbnail && (
        <ul className="list-unstyled">
          <li className="d-flex align-items-center mb-2" style={{ backgroundColor: "#f2f2f2", padding: "8px", marginBottom: "8px", borderRadius: "7px" }}>
            <span className="file-icon">
              <FontAwesomeIcon icon={faImage} />
            </span>{" "}
            <span style={{ marginRight: "8px" }}></span>
            <span>{thumbnail.nome}</span>
            <div className="ms-auto">
              <button
                type="button"
                className="btn btn-link text-reset"
                onClick={handleRemoveThumbnail}
              >
                <BsTrash3 className="icon" style={{ color: "var(--red)" }} />
              </button>
            </div>
          </li>
        </ul>
      )}

      {/* Mensagem "Nenhuma imagem selecionada" */}
      {!hasSelectedThumbnail && (
        <div className="mb-2 d-flex align-items-center" style={{ backgroundColor: "#f2f2f2", padding: "8px", marginTop: "-15px", borderRadius: "7px" }}>
          <FontAwesomeIcon icon={faImage} className="me-2" />
          Nenhuma imagem selecionada
        </div>
      )}

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
  );
}
