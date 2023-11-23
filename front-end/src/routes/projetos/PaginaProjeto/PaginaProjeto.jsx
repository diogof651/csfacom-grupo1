import React, { useEffect, useState } from "react";
import Badge from "react-bootstrap/Badge";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import { BsPencilSquare, BsTrash } from "react-icons/bs";
import { useNavigate } from "react-router";
import { Link, useParams } from "react-router-dom";
import { useAuth } from "../../../AutorizacaoServico.jsx";
import { BotaoComIcone } from "../../../components/Botoes/BotaoComIcone";
import { BotaoOutline } from "../../../components/Botoes/BotaoOutline";
import Membro from "../../../components/Membro/Membro.jsx";
import InformacoesMembroModal from "./../Membro/InformacoesMembroModal";

export function PaginaProjeto() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [showModal, setShowModal] = useState(false);
  const iconStyle = {
    width: "18px",
    height: "18px",
  };

  const opcoes = [
    { name: "Ativo", value: "ativo" },
    { name: "Participações Anteriores", value: "anteriores" },
  ];
  const [activeTab, setActiveTab] = useState(true);
  const handleTabSelect = (selectedTab) => {
    setActiveTab(selectedTab);
  };

  const [projeto, setProjeto] = useState({});
  const [membros, setMembros] = useState([]);
  const [membroSelecionado, setMembroSelecionado] = useState(null);

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

  const handleOpenModal = (user) => {
    setMembroSelecionado(user);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setMembroSelecionado(null);
    setShowModal(false);
  };

  useEffect(() => {
    obterProjeto();
    obterMembros();
  }, []);

  useEffect(() => {
    obterMembros();
  }, [activeTab]);

  function obterProjeto() {
    fetch(`http://localhost:8080/api/v1/projetos/${id}`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((resposta) => resposta.json())
      .then((data) => {
        setProjeto(data);
        document.title = data.nome; // Define o título da aba como o título do projeto
      })
      .catch((erro) => console.log(erro));
  }

  function obterMembros() {
    fetch(
      `http://localhost:8080/api/v1/membros/projeto/${id}/obter?ativo=${activeTab}`,
      {
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
      }
    )
      .then((resposta) => resposta.json())
      .then((data) => {
        setMembros(data);
      })
      .catch((erro) => console.log(erro));
  }

  function remover() {
    fetch(`http://localhost:8080/api/v1/projetos/${id}/desativar`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
    })
      .then(() => navigate("/"))
      .catch((erro) => console.log(erro));
  }

  return (
    <Container
      className="d-flex flex-column mb-4"
      style={{ minHeight: "100vh", marginTop: "40px" }}
    >
      <div
        className="d-flex justify-content-between align-items-start flex-wrap gap-2"
        style={{
          width: "100%",
          marginBottom: "10px",
        }}
      >
        <div className="d-flex flex-column">
          <p>{`${new Date(projeto.inicio).toLocaleDateString()} - ${new Date(
            projeto.termino
          ).toLocaleDateString()}`}</p>
          <h1
            style={{
              fontFamily: "Inter",
              fontWeight: "bold",
              marginRight: "10px",
            }}
          >
            {projeto.nome}
          </h1>
          <div className="d-flex gap-2">
            <Badge bg="dark">{projeto.tipo}</Badge>
            <Badge bg="danger">{projeto.status}</Badge>
          </div>
        </div>
        <>
          {temPermissao ? (
            <div className="d-flex gap-2">
              <Link
                to={`/editarProjeto/${id}`}
                className="text-decoration-none"
              >
                <BotaoComIcone color="var(--black)">
                  <BsPencilSquare style={iconStyle} /> Editar
                </BotaoComIcone>
              </Link>
              <BotaoComIcone color="var(--black)" onClick={remover}>
                <BsTrash style={iconStyle} /> Remover
              </BotaoComIcone>
            </div>
          ) : (
            <></>
          )}
        </>
      </div>
      <div dangerouslySetInnerHTML={{ __html: projeto.descricao }} />
      <h1
        style={{
          fontFamily: "Inter",
          fontWeight: "bold",
          marginRight: "10px",
          paddingBottom: "5px",
          marginTop: "40px",
        }}
      >
        Membros
      </h1>
      <div
        className="d-flex justify-content-between"
        style={{
          width: "100%",
          borderBottom: "1px solid #ccc",
        }}
      >
        <Nav
          variant="tabs"
          defaultActiveKey={activeTab}
          onSelect={handleTabSelect}
        >
          <Nav.Item>
            <Nav.Link eventKey="true" style={{ color: "var(--blue)" }}>
              Ativo
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="false" style={{ color: "var(--blue)" }}>
              Participações anteriores
            </Nav.Link>
          </Nav.Item>
        </Nav>
        <>
          {temPermissao ? (
            <Link
              to={`/cadastroMembro/projeto/${id}`}
              className="text-decoration-none"
            >
              <BotaoOutline color="var(--blue)"> Novo Membro </BotaoOutline>
            </Link>
          ) : (
            <></>
          )}
        </>
      </div>
      <div style={{ marginBottom: "120px", display: "block" }}>
        {membros.length === 0 ? (
          <></>
        ) : (
          membros.map((membro, index) => (
            <div
              key={index}
              style={{
                cursor: "pointer",
              }}
            >
              <Membro
                membro={membro}
                selecionar={() => handleOpenModal(membro)}
                idProjeto={id}
              />
            </div>
          ))
        )}

        {membroSelecionado && (
          <InformacoesMembroModal
            membro={membroSelecionado}
            onClose={handleCloseModal}
            show={showModal}
          />
        )}
      </div>
    </Container>
  );
}
