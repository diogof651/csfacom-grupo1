import React, { useEffect, useState } from "react";
import Badge from "react-bootstrap/Badge";
import Container from "react-bootstrap/Container";
import { BsPencilSquare, BsTrash } from "react-icons/bs";
import { useNavigate } from "react-router";
import { Link, useParams } from "react-router-dom";
import { BotaoComIcone } from "../../../components/Botoes/BotaoComIcone";

export function PaginaProjeto() {
  const navigate = useNavigate();
  const { id } = useParams();
  const iconStyle = {
    width: "18px",
    height: "18px",
  };

  const [projeto, setProjeto] = useState({});

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
        document.title = data.nome; // Define o título da aba como o título do projeto
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
    </Container>
  );
}
