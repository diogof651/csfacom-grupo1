import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import {
  BsArchive,
  BsPaperclip,
  BsPencilSquare,
  BsDownload,
} from "react-icons/bs";
import { useNavigate } from "react-router";
import { Link, useParams } from "react-router-dom";
import { BotaoComIcone } from "../../../components/Botoes/BotaoComIcone";
import styles from "./PaginaNoticia.module.css";
import NoticiaCard from "../../../components/NoticiaCard/NoticiaCard";

export function PaginaNoticia() {
  const navigate = useNavigate();
  const { id } = useParams();
  const iconStyle = {
    width: "18px",
    height: "18px",
  };

  const [noticia, setNoticia] = useState({});
  const [noticiasEmDestaque, setNoticiaEmDestaque] = useState([]);

  useEffect(() => {
    obterNoticia();
    obterNoticiasEmDestaque();
  }, []);

  function obterNoticiasEmDestaque() {
    fetch("http://localhost:8080/api/v1/noticias?estado=Destaque", {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((resposta) => resposta.json())
      .then((data) => {
        const primeiras5Noticias = data.slice(0, 5);
        setNoticiaEmDestaque(primeiras5Noticias);
      })
      .catch((erro) => console.log(erro));
  }

  function obterNoticia() {
    fetch(`http://localhost:8080/api/v1/noticias/${id}`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((resposta) => resposta.json())
      .then((data) => {
        setNoticia(data);
      })
      .catch((erro) => console.log(erro));
  }

  function arquivar() {
    fetch(`http://localhost:8080/api/v1/noticias/${id}/arquivar`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
    })
      .then(() => navigate("/"))
      .catch((erro) => console.log(erro));
  }
  function desarquivar() {
    fetch(`http://localhost:8080/api/v1/noticias/${id}/desarquivar`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
    })
      .then(() => navigate("/"))
      .catch((erro) => console.log(erro));
  }

  return (
    <Container
      className="d-flex justify-content-between gap-5"
      style={{
        width: "100vw",
        marginTop: "40px",
      }}
    >
      <section
        style={{
          width: "80%",
          marginBottom: "20px",
        }}
      >
        <div
          style={{
            marginBottom: "10px",
          }}
          className="d-flex justify-content-between align-items-start flex-wrap gap-2"
        >
          <div className="d-flex flex-column">
            <h1
              style={{
                fontFamily: "Inter",
                fontWeight: "bold",
                marginRight: "10px",
              }}
            >
              {noticia.titulo}
            </h1>
            <p>
              Publicada em{" "}
              {`${new Date(noticia.dataPublicacao).toLocaleDateString()}`} por{" "}
              {noticia.autor ? noticia.autor.nome : ""}
            </p>
          </div>
          {noticia.estado === "Arquivada" ? (
            <BotaoComIcone color="var(--black)" onClick={desarquivar}>
              <BsArchive style={iconStyle} /> Desarquivar
            </BotaoComIcone>
          ) : (
            <div className="d-flex gap-2">
              <Link
                to={`/editarNoticia/${id}`}
                className="text-decoration-none"
              >
                <BotaoComIcone color="var(--black)">
                  <BsPencilSquare style={iconStyle} /> Editar
                </BotaoComIcone>
              </Link>
              <BotaoComIcone color="var(--black)" onClick={arquivar}>
                <BsArchive style={iconStyle} /> Arquivar
              </BotaoComIcone>
            </div>
          )}
        </div>
        <div
          className={styles.noticiaConteudo}
          dangerouslySetInnerHTML={{ __html: noticia.conteudo }}
        />

        {noticia && noticia.anexos && noticia.anexos.length > 0 && (
          <div>
            <h5 className="mt-4">Anexos</h5>
            <ul className="list-unstyled">
              {noticia.anexos.map((anexo, index) => (
                <li
                  key={index}
                  className="d-flex align-items-center mb-2 justify-content-between"
                  style={{
                    backgroundColor: "#f2f2f2",
                    padding: "8px",
                    borderRadius: "7px",
                  }}
                >
                  <span className="file-icon">
                    <BsPaperclip />
                    {anexo.titulo}
                  </span>
                  <a
                    style={{ textDecoration: "none" }}
                    href={`data:application/octet-stream;base64,${anexo.conteudo}`}
                    download={anexo.titulo}
                  >
                    <BotaoComIcone>
                      <BsDownload></BsDownload> Baixar
                    </BotaoComIcone>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>
      <section
        style={{
          width: "20%",
        }}
      >
        <h5> Em destaque </h5>
        <NoticiaCard cards={noticiasEmDestaque} />
      </section>
    </Container>
  );
}
