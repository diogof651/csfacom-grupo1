import React, { useEffect, useState } from "react";
import Badge from "react-bootstrap/Badge";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import { BsPuzzle } from "react-icons/bs";
import { Link } from "react-router-dom";
import { BarraDePesquisa } from "../../../components/BarraDePesquisa/BarraDePesquisa";
import { BotaoOutline } from "../../../components/Botoes/BotaoOutline.jsx";
import { Select } from "../../../components/Select/Select";

export function ListagemProjetos() {
  const [tipoSelectedOption, setTipoSelectedOption] = useState("");
  const [estadoSelectedOption, setEstadoSelectedOption] = useState("");
  const [searchText, setSearchText] = useState("");
  const [cards, setCards] = useState([]);

  const optionsTipoProjeto = [
    "Projeto de extensão",
    "TCC",
    "Mestrado",
    "Doutorado",
    "IC",
    "Atividade Orientada de Ensino",
    "Estágio",
  ];

  const optionsEstado = ["Em andamento", "Concluído", "Descontinuado"];

  useEffect(() => {
    obterProjetos();
    // Defina o título da página aqui
    document.title = "Projetos";
  }, []);

  function obterProjetos() {
    fetch("http://localhost:8080/api/v1/projetos/listagem", {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((resposta) => resposta.json())
      .then((data) => {
        setCards(data);
      })
      .catch((erro) => console.log(erro));
  }

  const tipoHandleOptionChange = (e) => {
    setTipoSelectedOption(e.target.value);
  };

  const estadoHandleOptionChange = (e) => {
    setEstadoSelectedOption(e.target.value);
  };

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleApplyFilter = () => {
    fetch(
      `http://localhost:8080/api/v1/projetos/listagem?tipo=${tipoSelectedOption}&status=${estadoSelectedOption}&nome=${searchText}`,
      {
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
      }
    )
      .then((resposta) => resposta.json())
      .then((data) => {
        setCards(data);
      })
      .catch((erro) => console.log(erro));
  };

  const handleClearFilters = () => {
    setTipoSelectedOption("");
    setEstadoSelectedOption("");
    setSearchText("");
    handleApplyFilter();
  };

  return (
    <Container
      className="d-flex flex-column"
      style={{ height: "100vh", marginTop: "40px" }}
    >
      <div
        className="d-flex justify-content-between align-items-center"
        style={{
          width: "100%",
          borderBottom: "1px solid #ccc",
          marginBottom: "10px",
        }}
      >
        <h1
          style={{
            fontFamily: "Inter",
            fontWeight: "bold",
            marginRight: "10px",
          }}
        >
          Projetos
        </h1>

        <Link to="/cadastroProjeto" className="text-decoration-none">
          <BotaoOutline color="var(--blue)"> Novo Projeto </BotaoOutline>
        </Link>
      </div>
      <Form className="mt-2">
        <div className="row">
          <div className="col-md-5 col-12 mb-2">
            <BarraDePesquisa
              handleSearchChange={handleSearchChange}
              searchText={searchText}
            />
          </div>
          <div className="col-md-3 col-6 mb-2">
            <Select
              optionDefault={"Tipo de Projeto"}
              options={optionsTipoProjeto}
              handleOptionChange={tipoHandleOptionChange}
              selectedOption={tipoSelectedOption}
            />
          </div>

          <div className="col-md-2 col-6 mb-2">
            <Select
              optionDefault={"Estado"}
              options={optionsEstado}
              handleOptionChange={estadoHandleOptionChange}
              selectedOption={estadoSelectedOption}
            />
          </div>
          <div className="col-md-2 col-12">
            <button
              type="button"
              className="btn btn-primary inter-bold w-100"
              style={{ backgroundColor: "var(--blue)" }}
              onClick={handleApplyFilter}
            >
              Aplicar
            </button>
            <button
              type="button"
              className="btn btn-outline-danger inter-bold w-100 mt-2"
              onClick={handleClearFilters}
            >
              Limpar Filtros
            </button>
          </div>
        </div>
      </Form>

      <div className="d-flex flex-wrap mt-4 w-100" style={{ gap: "20px" }}>
        {cards.length === 0 ? (
          <p>Nenhum projeto foi encontrado</p>
        ) : (
          cards.map((card, index) => (
            <Card key={index} style={{ width: "19rem" }}>
              <BsPuzzle
                style={{ fontSize: "2em", marginLeft: "8px", marginTop: "8px" }}
              />{" "}
              {/* Aumente o tamanho do ícone */}
              <Link
                to={`/projeto/${card.id}`}
                style={{ color: "var(--black)", textDecoration: "none" }}
              >
                <Card.Body>
                  <Card.Title>{card.nome}</Card.Title>
                  <div className="d-flex flex-column">
                    <span style={{ fontSize: "10px" }}>
                      {`${new Date(
                        card.inicio
                      ).toLocaleDateString()} - ${new Date(
                        card.termino
                      ).toLocaleDateString()}`}
                    </span>
                    <span>{card.tipo}</span>
                    <span>
                      {card.status === "Em andamento" && (
                        <Badge bg="primary">Em andamento</Badge>
                      )}
                      {card.status === "Concluido" && (
                        <Badge bg="success">Concluído</Badge>
                      )}
                      {card.status === "Descontinuado" && (
                        <Badge bg="danger">Descontinuado</Badge>
                      )}
                    </span>
                  </div>
                </Card.Body>
              </Link>
            </Card>
          ))
        )}
      </div>
    </Container>
  );
}
