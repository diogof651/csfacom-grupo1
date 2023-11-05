import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import "react-datepicker/dist/react-datepicker.css";
import "react-quill/dist/quill.snow.css";
import { useNavigate } from "react-router";
import { BotaoComFundo } from "../../../components/Botoes/BotaoComFundo";
import { BotaoOutline } from "../../../components/Botoes/BotaoOutline";
import { FotoPerfil } from "../../../components/FotoPerfil/FotoPerfil";
import { Input } from "../../../components/Input/Input";
import { FormularioDefinirSenha } from "../../acesso/DefinicaoSenha/FormularioDefinirSenha";
import { useAuth } from "./../../../AutorizacaoServico";

export function Perfil() {
  const { usuarioLogado, hashUsuarioLogado } = useAuth();
  const navigate = useNavigate();

  const [codigoUnico, setCodigoUnico] = useState("");
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [github, setGithub] = useState("");
  const [foto, setFoto] = useState("");

  const [showModal, setShowModal] = useState(false);

  function cancelar() {
    navigate("/");
  }

  const handleImageSelect = (selectedImage) => {
    setFoto(selectedImage);
  };

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    if (!usuarioLogado()) {
      navigate("/");
    } else {
      fetch("http://localhost:8080/api/v1/usuarios/perfil", {
        method: "GET",
        headers: {
          usuarioLogado: hashUsuarioLogado(),
        },
      })
        .then((resposta) => resposta.json())
        .then((data) => {
          preencherCampos(data);
        })
        .catch((erro) => console.log(erro));
    }
  }, [usuarioLogado, navigate]);

  const onSubmit = (e) => {
    e.preventDefault();

    const data = {
      codigoUnico: codigoUnico,
      nome: nome,
      email: email,
      linkedin: linkedin,
      github: github,
      foto: foto,
    };
    fetch(`http://localhost:8080/api/v1/usuarios/${codigoUnico}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
        usuarioLogado: hashUsuarioLogado(),
      },
      body: JSON.stringify(data),
    })
      .then((resposta) => resposta.json())
      .then((data) => {
        preencherCampos(data);
      })
      .catch((erro) => console.log(erro));
  };

  function preencherCampos(data) {
    setCodigoUnico(data.codigoUnico);
    setNome(data.nome);
    setEmail(data.email);
    if (data.linkedin) {
      setLinkedin(data.linkedin);
    }
    if (data.github) {
      setGithub(data.github);
    }
    if (data.foto) {
      setFoto(data.foto);
    }
  }

  if (usuarioLogado()) {
    return (
      <>
        <Container
          className="d-flex flex-column"
          style={{ width: "50vw", marginTop: "40px" }}
        >
          <h1
            style={{
              borderBottom: "1px solid #ccc",
              marginBottom: "10px",
              fontWeight: "bold",
              paddingBottom: "5px",
            }}
          >
            Perfil
          </h1>
          <Form
            className={`d-flex justify-content-center flex-column form-container w-100`}
            onSubmit={onSubmit}
          >
            <div className="mx-auto mt-2 mb-2">
              <FotoPerfil onImageSelect={handleImageSelect} foto={foto} />
            </div>
            <div className="d-flex justify-content-between align-items-center mt-2">
              <div className="ml-auto">
                <Button variant="outline-secondary" onClick={handleShowModal}>
                  Trocar Senha
                </Button>
              </div>
            </div>

            <Input
              value={codigoUnico}
              onChange={(e) => setCodigoUnico(e.target.value)}
              label={"Codigo Unico"}
              required={true}
              disabled={true}
              tipo={"text"}
            ></Input>
            <Input
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              label={"Nome"}
              required={true}
              placeholder={"Digite seu nome"}
              tipo={"text"}
            ></Input>
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              label={"Email"}
              required={true}
              placeholder={"Digite seu email"}
              tipo={"email"}
            ></Input>
            <Input
              value={linkedin}
              onChange={(e) => setLinkedin(e.target.value)}
              label={"Linkedin"}
              placeholder={"Digite seu linkedin"}
              tipo={"text"}
            ></Input>
            <Input
              value={github}
              onChange={(e) => setGithub(e.target.value)}
              label={"GitHub"}
              placeholder={"Digite seu github"}
              tipo={"text"}
            ></Input>

            <div className="d-flex justify-content-end gap-2 mt-4">
              <BotaoOutline color="var(--blue)" onClick={cancelar}>
                Cancelar
              </BotaoOutline>
              <BotaoComFundo type="submit" color="var(--blue)">
                Salvar
              </BotaoComFundo>
            </div>
          </Form>

          <Modal show={showModal} onHide={handleCloseModal}>
            <Modal.Header closeButton></Modal.Header>
            <Modal.Body>
              <FormularioDefinirSenha
                textoBotao="Trocar senha"
                navegacao={handleCloseModal}
                codigoUnico={codigoUnico}
              ></FormularioDefinirSenha>
            </Modal.Body>
          </Modal>
        </Container>
      </>
    );
  }
}
