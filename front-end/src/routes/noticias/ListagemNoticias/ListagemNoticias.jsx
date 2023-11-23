import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  BsArchive,
  BsClock,
  BsNewspaper,
  BsPen,
  BsStickies,
} from "react-icons/bs";
import { Link } from "react-router-dom";
import { useAuth } from "../../../AutorizacaoServico.jsx";
import { BarraDePesquisa } from "../../../components/BarraDePesquisa/BarraDePesquisa";
import { BotaoOutline } from "../../../components/Botoes/BotaoOutline.jsx";
import NoticiaCard from "../../../components/NoticiaCard/NoticiaCard";
import { Select } from "../../../components/Select/Select";

export function ListagemNoticias() {
  const [autores, setAutores] = useState([]);
  const [selectedAuthor, setSelectedAuthor] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [cards, setCards] = useState([]);
  const [activeTab, setActiveTab] = useState("Publicada"); // Aba ativa

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
                permissao.nome === "ADMIN" || permissao.nome === "EDITORNOTICIA"
            )
          );
        })
        .catch((erro) => console.log(erro));
    }

    obterPermissoesUsuario();
  }, []);

  useEffect(() => {
    function fetchAutores() {
      fetch("http://localhost:8080/api/v1/usuarios/autores", {
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
      })
        .then((resposta) => resposta.json())
        .then((data) => {
          setAutores(data);
        })
        .catch((erro) => console.log(erro));
    }

    fetchAutores();
  }, []);

  useEffect(() => {
    function obterNoticias() {
      fetch(`http://localhost:8080/api/v1/noticias?estado=${activeTab}`, {
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

    obterNoticias();
  }, [activeTab]);

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
    const dataPublicacaoFormatada = selectedDate
      ? new Date(selectedDate).toISOString()
      : null;

    fetch(
      `http://localhost:8080/api/v1/noticias?titulo=${searchText}&estado=${activeTab}&autor=${selectedAuthor}&dataPublicacao=${dataPublicacaoFormatada}`,
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
    setSelectedAuthor("");
    setSelectedDate(null);
    setSearchText("");
    handleApplyFilter();
  };

  const handleTabSelect = (selectedTab) => {
    setActiveTab(selectedTab);
  };

  useEffect(() => {
    handleApplyFilter();
    document.title = "Notícias";
  }, [activeTab]);

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

        <>
          {temPermissao ? (
            <Link to="/cadastroNoticia" className="text-decoration-none">
              <BotaoOutline color="var(--blue)"> Nova Notícia </BotaoOutline>
            </Link>
          ) : (
            <></>
          )}
        </>
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
              optionDefault="Autor"
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
      <>
        {temPermissao ? (
          <Nav
            variant="tabs"
            defaultActiveKey={activeTab}
            onSelect={handleTabSelect}
          >
            <Nav.Item>
              <Nav.Link eventKey="Publicada" style={{ color: "var(--blue)" }}>
                <BsNewspaper /> Publicada
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="Agendada" style={{ color: "var(--blue)" }}>
                <BsClock /> Agendada
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
        ) : (
          <></>
        )}
      </>

      <NoticiaCard cards={cards} />
    </Container>
  );
}
