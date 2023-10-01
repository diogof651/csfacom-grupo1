import React from "react";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";

export default function NoticiaCard({ cards }) {
  return (
    <div className="d-flex flex-wrap mt-4" style={{ gap: "20px" }}>
      {cards.length === 0 ? (
        <p>Nenhuma notícia foi encontrada</p>
      ) : (
        cards.map((card, index) => (
          <Card
            key={index}
            style={{ width: "239px", height: "180px" }}
            className="mb-3"
          >
            <Link
              to={`/noticia/${card.id}`}
              style={{ color: "var(--black)", textDecoration: "none" }}
            >
              <Card.Img
                variant="top"
                src={
                  card.thumbnail
                    ? `data:image/jpeg;base64,${card.thumbnail}`
                    : "src/assets/thumbnailPadrao.png"
                }
                style={{
                  width: "100%",
                  height: "100px",
                  objectFit: "cover",
                }}
              />
              <Card.Body>
                <Card.Title>{card.titulo}</Card.Title>
                <div className="d-flex flex-column">
                  <span style={{ fontSize: "10px" }}>
                    {`Publicada em ${new Date(
                      card.dataPublicacao
                    ).toLocaleDateString()} por ${card.autor.nome}`}
                  </span>
                </div>
              </Card.Body>
            </Link>
          </Card>
        ))
      )}
    </div>
  );
}
