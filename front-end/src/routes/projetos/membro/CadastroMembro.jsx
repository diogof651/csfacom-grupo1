import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import "react-datepicker/dist/react-datepicker.css";
import { useForm } from "react-hook-form";
import { BsPlusCircle } from "react-icons/bs";
import "react-quill/dist/quill.snow.css";
import { useNavigate, useParams } from "react-router";
import { useAuth } from "../../../AutorizacaoServico";
import { BotaoComFundo } from "../../../components/Botoes/BotaoComFundo";
import { BotaoOutline } from "../../../components/Botoes/BotaoOutline";
import { Input } from "../../../components/Input/Input";
import { ModalTipos } from "../../gerenciador/ModalTipos";

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

  const [showModal, setShowModal] = useState(false);
  const [modoEdicao, setModoEdicao] = useState(false);
  const [titulo, setTitulo] = useState("");
  const [salvar, setSalvar] = useState(null);

  const [temPermissao, setTemPermissao] = useState(false);
  const { hashUsuarioLogado } = useAuth();

  useEffect(() => {
    function obterPermissoesUsuario() {
      fetch("http://localhost:8080/api/v1/usuarios/obterPermissoes", {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          usuarioLogado: hashUsuarioLogado(),
        },
      })
        .then((resposta) => resposta.json())
        .then((data) => {
          const permissoes = data;
          setTemPermissao(
            permissoes.some(
              (permissao) =>
                permissao.nome === "ADMIN" || permissao.nome === "EDITORPROJETO"
            )
          );
        })
        .catch((erro) => console.log(erro));
    }

    obterPermissoesUsuario();
  }, []);

  const handleOpenTipoPapel = () => {
    setTitulo("Tipo de Papel");
    setSalvar(() => salvarTipoPapel);
    setModoEdicao(false);
    setShowModal(true);
  };

  const handleOpenTipoVinculo = () => {
    setTitulo("Tipo de Vinculo");
    setSalvar(() => salvarTipoVinculo);
    setModoEdicao(false);
    setShowModal(true);
  };

  useEffect(() => {
    if (tiposDePapel.length === 0) {
      obterTiposDePapel();
    }
    if (tiposDeVinculo.length === 0) {
      obterTiposDeVinculo();
    }

    if (idMembro) {
      fetch(`http://localhost:8080/api/v1/membros/${idMembro}/`, {
        method: "GEt",
        headers: {
          "Content-type": "application/json",
          usuarioLogado: hashUsuarioLogado(),
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
        usuarioLogado: hashUsuarioLogado(),
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
        usuarioLogado: hashUsuarioLogado(),
      },
    })
      .then((resposta) => resposta.json())
      .then((data) => {
        setTiposDeVinculo(data);
      })
      .catch((erro) => console.log(erro));
  }

  function salvarTipoPapel(tipo) {
    const url = "http://localhost:8080/api/v1/tipoPapel";
    fetch(`${url}/`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(tipo),
    })
      .then(() => obterTiposDePapel())
      .catch((erro) => console.log(erro));
  }

  function salvarTipoVinculo(tipo) {
    const url = "http://localhost:8080/api/v1/tipoVinculo";
    fetch(`${url}/`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(tipo),
    })
      .then(() => obterTiposDeVinculo())
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
          usuarioLogado: hashUsuarioLogado(),
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
            usuarioLogado: hashUsuarioLogado(),
          },
          body: JSON.stringify(data),
        }
      )
        .then((resposta) => navigate(`/projeto/${idProjeto}`))
        .catch((erro) => console.log(erro));
    }
  };

  function cancelar() {
    navigate(`/projeto/${idProjeto}`);
  }

  return (
    <>
      {temPermissao ? (
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
              <div className="row">
                <div className="col-md-10 col-12">
                  <Form.Label
                    style={{ fontWeight: "bold", fontSize: "18px" }}
                    className="mt-3"
                  >
                    Tipo de vinculo
                  </Form.Label>
                </div>
                <div className="col-md-2 col-12">
                  <BotaoOutline
                    color="var(--blue)"
                    style={{
                      fontSize: "0.8em", // Ajuste de tamanho
                      padding: "5px 8px", // Ajuste de padding
                    }}
                    onClick={handleOpenTipoVinculo}
                  >
                    <BsPlusCircle style={{ marginRight: "-3px" }} /> Adicionar
                  </BotaoOutline>
                </div>

                {tiposDeVinculo.map((vinculo, index) => (
                  <Form.Check
                    key={index}
                    className="mt-3"
                    type="checkbox"
                    id="ativoCheckbox"
                    label={vinculo.nome}
                    checked={vinculosSelecionados.some(
                      (vinculoSelecionado) =>
                        vinculoSelecionado.id == vinculo.id
                    )}
                    onChange={() =>
                      toggleSelecionado(vinculo, setVinculosSelecionados)
                    }
                  />
                ))}
              </div>
              <div className="row">
                <div className="col-md-10 col-12 ">
                  <Form.Label
                    style={{ fontWeight: "bold", fontSize: "18px" }}
                    className="mt-3"
                  >
                    Tipo de papel
                  </Form.Label>
                </div>
                <div className="col-md-2 col-12">
                  <BotaoOutline
                    color="var(--blue)"
                    style={{
                      fontSize: "0.8em", // Ajuste de tamanho
                      padding: "5px 8px", // Ajuste de padding
                    }}
                    onClick={handleOpenTipoPapel}
                  >
                    <BsPlusCircle style={{ marginRight: "-3px" }} /> Adicionar
                  </BotaoOutline>
                </div>
              </div>

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
                  onChange={() =>
                    toggleSelecionado(papel, setPapeisSelecionados)
                  }
                />
              ))}

              <div className="d-flex justify-content-end gap-2 mt-4 mb-4">
                <BotaoOutline color="var(--blue)" onClick={cancelar}>
                  Cancelar
                </BotaoOutline>
                <BotaoComFundo type="submit" color="var(--blue)">
                  Cadastrar
                </BotaoComFundo>
              </div>
            </Form>
          </Container>

          <ModalTipos
            titulo={titulo}
            salvar={salvar}
            showModal={showModal}
            setShowModal={setShowModal}
            modoEdicao={modoEdicao}
            itemSelecionado={null}
          />
        </>
      ) : (
        <h1>Você não tem permissão para acessar esta página.</h1>
      )}
    </>
  );
}
