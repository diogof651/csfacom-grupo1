import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import { Link } from "react-router-dom";
import { BarraDePesquisa } from "../../../components/BarraDePesquisa/BarraDePesquisa";
import { BotaoOutline } from "../../../components/Botoes/BotaoOutline.jsx";
import { Select } from "../../../components/Select/Select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { BsNewspaper, BsArchive, BsPen, BsStickies } from "react-icons/bs"; // Importe os ícones aqui

export function ListagemNoticias() {
  const [autores, setAutores] = useState([]);
  const [selectedAuthor, setSelectedAuthor] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [cards, setCards] = useState([]);
  const [originalCards, setOriginalCards] = useState([]);
  const [activeTab, setActiveTab] = useState("Publicada"); // Aba ativa

  useEffect(() => {
    function fetchAutores() {
      // Substitua isso com uma chamada à API que lista os autores
      fetch("http://localhost:8080/api/v1/autores", {
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
      })
        .then((resposta) => resposta.json())
        .then((data) => {
          // A API deve retornar uma lista de autores com um formato semelhante ao seu DTO
          const autoresData = data.map((autor) => ({
            id: autor.id,
            nome: autor.nome,
          }));
          setAutores([
            { id: "", nome: "Selecione o Autor" },
            ...autoresData,
          ]);
        })
        .catch((erro) => console.log(erro));
    }

    fetchAutores();
  }, []);

  useEffect(() => {
    function obterNoticias() {
      // Substitua isso com uma chamada à API que lista as notícias
      fetch("http://localhost:8080/api/v1/noticias", {
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
      })
        .then((resposta) => resposta.json())
        .then((data) => {
          // A API deve retornar uma lista de notícias com um formato semelhante ao seu DTO
          const noticiasData = data.map((noticia) => ({
            id: noticia.id,
            titulo: noticia.titulo,
            dataCadastro: noticia.dataPublicacao,
            autor: noticia.autor.nome,
            thumbnail: noticia.thumbnail,
          }));
          setCards(noticiasData);
          setOriginalCards(noticiasData);
        })
        .catch((erro) => console.log(erro));
    }

    obterNoticias();
  }, []);

  const handleAuthorChange = (e) => {
    setSelectedAuthor(e.target.value);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleApplyFilter = () => {
    // Substitua isso com uma chamada à API para filtrar as notícias com base nos parâmetros selecionados
    fetch(
      `http://localhost:8080/api/v1/noticias?autor_id=${selectedAuthor}&dataPublicacao=${selectedDate}&titulo=${searchText}`,
      {
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
      }
    )
      .then((resposta) => resposta.json())
      .then((data) => {
        // A API deve retornar uma lista de notícias filtradas com um formato semelhante ao seu DTO
        const filteredNoticias = data.map((noticia) => ({
          id: noticia.id,
          titulo: noticia.titulo,
          dataCadastro: noticia.dataPublicacao,
          autor: noticia.autor.nome,
          thumbnail: noticia.thumbnail,
        }));
        setCards(filteredNoticias);
      })
      .catch((erro) => console.log(erro));
  };

  const resetFilters = () => {
    setSelectedAuthor("");
    setSelectedDate(null);
    setSearchText("");
    setCards(originalCards);
  };

  const handleTabSelect = (selectedTab) => {
    // Defina a aba ativa com base na seleção do usuário
    setActiveTab(selectedTab);
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
          Notícias
        </h1>

        <Link to="/cadastroNoticia" className="text-decoration-none">
          <BotaoOutline color="var(--blue)"> Nova Notícia </BotaoOutline>
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
              options={autores.map((autor) => autor.nome)}
              handleOptionChange={handleAuthorChange}
              selectedOption={selectedAuthor}
              placeholder="Autor"
            />
          </div>

          <div className="col-md-2 col-6 mb-2">
            <DatePicker
              selected={selectedDate}
              onChange={handleDateChange}
              dateFormat="dd/MM/yyyy"
              placeholderText="Data"
              className="form-control inter-bold"
            />
          </div>
          <div className="col-md-2 col-12">
            <button
              type="button"
              className="btn btn-primary inter-bold w-100"
              style={{ backgroundColor: "var(--blue)" }}
              onClick={handleApplyFilter}
            >
              Buscar
            </button>
          </div>
        </div>
      </Form>

      <Nav variant="tabs" defaultActiveKey={activeTab} onSelect={handleTabSelect}>
        <Nav.Item>
          <Nav.Link eventKey="Publicada" style={{ color: "var(--blue)" }}>
            <BsNewspaper /> Publicada
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="Arquivada" style={{ color: "var(--blue)" }}>
            <BsArchive /> Arquivada
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="Rascunho" style={{ color: "var(--blue)" }}>
            <BsPen /> Rascunho
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="Destaque" style={{ color: "var(--blue)" }}>
            <BsStickies /> Destaque
          </Nav.Link>
        </Nav.Item>
      </Nav>

      <div className="d-flex flex-wrap mt-4" style={{ gap: "20px" }}>
        {cards.map((card, index) => (
          <Card key={index} style={{ width: "239px", height: "180px" }} className="mb-3">
            <Link
              to={`/noticia/${card.id}`}
              style={{ color: "var(--black)", textDecoration: "none" }}
            >
              <Card.Img
                variant="top"
                src={card.thumbnail}
                style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "cover" }}
              />
              <Card.Body>
                <Card.Title>{card.titulo}</Card.Title>
                <div className="d-flex flex-column">
                  <span style={{ fontSize: "10px" }}>
                    {`Publicada em ${new Date(
                      card.dataCadastro
                    ).toLocaleDateString()} por ${card.autor}`}
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
