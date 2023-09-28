import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import { BsArchive, BsPaperclip, BsPencilSquare } from "react-icons/bs";
import { useNavigate } from "react-router";
import { Link, useParams } from "react-router-dom";
import { BotaoComIcone } from "../../../components/Botoes/BotaoComIcone";

export function PaginaNoticia() {
  const navigate = useNavigate();
  const { id } = useParams();
  const iconStyle = {
    width: "18px", // Defina o tamanho desejado
    height: "18px", // Defina a altura desejada (opcional)
  };

  const [noticia, setNoticia] = useState({
    titulo: "Noticia 02 - Agendada",
    nomeAutor: "Autor",
    conteudo: "string",
    estado: "Agendada",
    dataPublicacao: "2023-09-27",
    emDestaque: true,
    anexos: [
      {
        id: 0,
        titulo: "documento.pdf",
        conteudo: "string",
      },
      {
        id: 0,
        titulo: "documento.pdf",
        conteudo: "string",
      },
    ],
  });

  //   useEffect(() => {
  //     obterNoticia();
  //   }, []);

  //   function obterNoticia() {
  //     // fetch(`http://localhost:8080/api/v1/projetos/${id}`, {
  //     //   method: "GET",
  //     //   headers: {
  //     //     "Content-type": "application/json",
  //     //   },
  //     // })
  //     //   .then((resposta) => resposta.json())
  //     //   .then((data) => {
  //     //     console.log(data);
  //     //     setNoticia(data);
  //     //   })
  //     //   .catch((erro) => console.log(erro));
  //   }

  function arquivar() {
    fetch(`http://localhost:8080/api/v1/projetos/${id}/arquivar`, {
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
      className="d-flex justify-content-between"
      style={{ height: "100vh", marginTop: "40px" }}
    >
      <section>
        <div
          className="d-flex justify-content-between align-items-start flex-wrap gap-2"
          style={{
            width: "100%",
            marginBottom: "10px",
          }}
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
              {noticia.nomeAutor}
            </p>
          </div>
          <div className="d-flex gap-2">
            <Link to={`/editarProjeto/${id}`} className="text-decoration-none">
              <BotaoComIcone color="var(--black)">
                <BsPencilSquare style={iconStyle} /> Editar
              </BotaoComIcone>
            </Link>
            <BotaoComIcone color="var(--black)" onClick={arquivar}>
              <BsArchive style={iconStyle} /> Arquivar
            </BotaoComIcone>
          </div>
        </div>
        <div dangerouslySetInnerHTML={{ __html: noticia.conteudo }} />

        <h5 className="mt-4"> Anexos </h5>
        <ul className="list-unstyled">
          {noticia.anexos.map((anexo, index) => (
            <li key={index} className="d-flex align-items-center mb-2">
              <span className="file-icon">
                <BsPaperclip />
              </span>
              <span style={{ marginRight: "8px" }}></span>
              <span>{anexo.titulo}</span>
            </li>
          ))}
        </ul>
      </section>
      <section>
        <h5 className="mt-4"> Em destaque </h5>
        {/* Lista de noticias em destaque */}
      </section>
    </Container>
  );
}
