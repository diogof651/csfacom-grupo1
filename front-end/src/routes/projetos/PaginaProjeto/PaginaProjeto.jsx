import React, { useEffect, useState } from "react";
import Badge from "react-bootstrap/Badge"; // Importe o componente Badge
import Container from "react-bootstrap/Container";
import { BsPencilSquare, BsTrash } from "react-icons/bs";
import { useNavigate } from "react-router";
import { Link, useParams } from "react-router-dom";
import AbasRadio from "../../../components/AbasRadio/AbasRadio";
import { BotaoComIcone } from "../../../components/Botoes/BotaoComIcone";
import { BotaoOutline } from "../../../components/Botoes/BotaoOutline";
import Membro from "../../../components/Membro/Membro.jsx";
import InformacoesMembroModal from "../membro/InformacoesMembroModal";

export function PaginaProjeto() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [showModal, setShowModal] = useState(false);
  const iconStyle = {
    width: "18px", // Defina o tamanho desejado
    height: "18px", // Defina a altura desejada (opcional)
  };

  const [projeto, setProjeto] = useState({});
  const opcoes = [
    { name: "Ativo", value: "ativo" },
    { name: "Participações Anteriores", value: "anteriores" },
  ];

  const [membroSelecionado, setMembroSelecionado] = useState(null);

  const membros = [
    {
      nome: "Maria",
      papeis: ["Desenvolvedor Back-end"],
      vinculos: ["Aluno"],
      email: "maria@example.com",
      ingressDate: "01/01/2020",
      endDate: "31/12/2021",
      foto: null,
      linkedin: "https://www.linkedin.com/in/maria",
      github: "https://github.com/maria",
    },
    {
      nome: "João",
      papeis: ["Designer", "Desenvolvedor Front-end"],
      vinculos: ["Coordenador"],
      email: "joao@example.com",
      ingressDate: "01/02/2020",
      endDate: "30/11/2021",
      foto: null,
      linkedin: "https://www.linkedin.com/in/joao",
      github: "https://github.com/joao",
    },
  ];

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
  }, []);

  function obterProjeto() {
    fetch(`http://localhost:8080/api/v1/projetos/${id}`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((resposta) => resposta.json())
      .then((data) => {
        console.log(data);
        setProjeto(data);
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
      className="d-flex flex-column"
      style={{ height: "100vh", marginTop: "40px" }}
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
        <div className="d-flex gap-2">
          <Link to={`/editarProjeto/${id}`} className="text-decoration-none">
            <BotaoComIcone color="var(--black)">
              <BsPencilSquare style={iconStyle} /> Editar
            </BotaoComIcone>
          </Link>
          <BotaoComIcone color="var(--black)" onClick={remover}>
            <BsTrash style={iconStyle} /> Remover
          </BotaoComIcone>
        </div>
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
        <AbasRadio opcoes={opcoes}></AbasRadio>
        <Link to="/cadastroMembro" className="text-decoration-none">
          <BotaoOutline color="var(--blue)"> Novo Membro </BotaoOutline>
        </Link>
      </div>
      {membros.map((membro, index) => (
        <div
          key={index}
          onClick={() => handleOpenModal(membro)}
          style={{ cursor: "pointer" }}
        >
          <Membro membro={membro} />
        </div>
      ))}

      {membroSelecionado && (
        <InformacoesMembroModal
          membro={membroSelecionado}
          onClose={handleCloseModal}
          show={showModal}
        />
      )}
    </Container>
  );
}
