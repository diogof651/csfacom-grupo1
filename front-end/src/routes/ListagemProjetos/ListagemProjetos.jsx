import React, { useState } from "react";
import Badge from "react-bootstrap/Badge"; // Importe o componente Badge
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import { BsPuzzle } from "react-icons/bs";
import { BarraDePesquisa } from "../../components/BarraDePesquisa/BarraDePesquisa";
import { Select } from "../../components/Select/Select";
import { Link } from "react-router-dom";

export function ListagemProjetos() {
  const [selectedOption1, setSelectedOption1] = useState("");
  const [selectedOption2, setSelectedOption2] = useState("");
  const [searchText, setSearchText] = useState("");
  const [cards, setCards] = useState(generateFixedCards());

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

  function generateFixedCards() {
    return [
      {
        id: 0,
        type: "Atividade orientadas de ensino",
        state: "Em andamento",
        text: "Soluções inovadoras para tornar as cidades mais verdes e eficientes em termos de recursos.",
        startDate: "01/01/2023",
        endDate: "31/12/2023",
      },
      {
        id: 1,
        type: "TCC",
        state: "Concluído",
        text: "Plataforma de ensino à distância que revoluciona a maneira como as pessoas aprendem.",
        startDate: "15/02/2022",
        endDate: "30/11/2022",
      },
      {
        id: 2,
        type: "Mestrado",
        state: "Em andamento",
        text: "Aplicativo que monitora a saúde e o bem-estar dos usuários, incentivando um estilo de vida ativo.",
        startDate: "10/05/2023",
        endDate: "05/12/2023",
      },
      {
        id: 3,
        type: "Doutorado",
        state: "Descontinuado",
        text: " Sistemas de energia solar e eólica em comunidades remotas, promovendo a independência energética.",
        startDate: "20/03/2021",
        endDate: "10/09/2021",
      },
      {
        id: 4,
        type: "Atividade orientadas de ensino",
        state: "Em andamento",
        text: "Soluções inovadoras para tornar as cidades mais verdes e eficientes em termos de recursos.",
        startDate: "01/01/2023",
        endDate: "31/12/2023",
      },
      {
        id: 5,
        type: "TCC",
        state: "Concluído",
        text: "Plataforma de ensino à distância que revoluciona a maneira como as pessoas aprendem.",
        startDate: "15/02/2022",
        endDate: "30/11/2022",
      },
      {
        id: 6,
        type: "Mestrado",
        state: "Em andamento",
        text: "Aplicativo que monitora a saúde e o bem-estar dos usuários, incentivando um estilo de vida ativo.",
        startDate: "10/05/2023",
        endDate: "05/12/2023",
      },
      {
        id: 7,
        type: "Doutorado",
        state: "Descontinuado",
        text: " Sistemas de energia solar e eólica em comunidades remotas, promovendo a independência energética.",
        startDate: "20/03/2021",
        endDate: "10/09/2021",
      },
      // Adicione mais cartões conforme necessário
    ];
  }

  const handleOptionChange1 = (e) => {
    setSelectedOption1(e.target.value);
  };

  const handleOptionChange2 = (e) => {
    setSelectedOption2(e.target.value);
  };

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleApplyFilter = () => {
    // Aplicar os filtros selecionados e atualizar a lista de cartões
    const filteredCards = generateFixedCards().filter((card) => {
      if (selectedOption1 && card.type !== selectedOption1) return false;
      if (selectedOption2 && card.state !== selectedOption2) return false;
      if (
        searchText &&
        !card.type.toLowerCase().includes(searchText.toLowerCase()) &&
        !card.state.toLowerCase().includes(searchText.toLowerCase()) &&
        !card.text.toLowerCase().includes(searchText.toLowerCase())
      ) {
        return false;
      }
      return true;
    });

    // Atualizar a lista de cartões filtrados
    setCards(filteredCards);
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
        <button
          type="button"
          className="btn inter-bold"
          style={{
            backgroundColor: "white",
            color: "#2788B7",
            border: "1px solid #2788B7",
          }}
        >
          Novo Projeto
        </button>
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
              options={optionsTipoProjeto}
              handleOptionChange={handleOptionChange1}
              selectedOption={selectedOption1}
            />
          </div>

          <div className="col-md-2 col-6 mb-2">
            <Select
              options={optionsEstado}
              handleOptionChange={handleOptionChange2}
              selectedOption={selectedOption2}
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
          </div>
        </div>
      </Form>

      <div className="d-flex flex-wrap mt-4 w-100" style={{ gap: "20px" }}>
        {cards.map((card, index) => (
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
                <Card.Title>{card.text}</Card.Title>
                <div className="d-flex flex-column">
                  <span style={{ fontSize: "10px" }}>
                    {` ${card.startDate} - ${card.endDate}`}
                  </span>
                  <span>{card.type}</span>
                  <span>
                    {card.state === "Em andamento" && (
                      <Badge bg="primary">Em andamento</Badge>
                    )}
                    {card.state === "Concluído" && (
                      <Badge bg="success">Concluído</Badge>
                    )}
                    {card.state === "Descontinuado" && (
                      <Badge bg="danger">Descontinuado</Badge>
                    )}
                  </span>
                </div>
              </Card.Body>
            </Link>
          </Card>
        ))}
      </div>
    </Container>
  );
}
