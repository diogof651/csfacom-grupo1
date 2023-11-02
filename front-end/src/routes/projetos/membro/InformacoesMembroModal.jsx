import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { Link } from "react-router-dom";
import { BotaoComIcone } from "../../../components/Botoes/BotaoComIcone";

export default function InformacoesMembroModal({ membro, show, onClose }) {
  const [fotoPerfil, setFotoPerfil] = useState("");

  useEffect(() => {
    if (membro) {
      setFotoPerfil(membro.usuario.fotoPerfil);
    }
  }, [membro]);

  if (!membro) {
    return null;
  }

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title> Informações Membro</Modal.Title>
      </Modal.Header>
      <Modal.Body className="p-4">
        <div className="d-flex gap-2">
          <div
            style={{
              width: "50px",
              height: "50px",
              borderRadius: "50%",
              backgroundColor: "#ccc",
            }}
          >
            {fotoPerfil && (
              <img
                src={
                  fotoPerfil != null && fotoPerfil
                    ? `data:image/jpeg;base64,${fotoPerfil}`
                    : ""
                }
                alt="Foto de perfil"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: "50%",
                }}
              />
            )}
          </div>
          <div className="d-flex flex-column">
            <h4 className="m-0">{membro.usuario.nome}</h4>
            <p>{membro.email}</p>
          </div>
        </div>

        <p>
          Data de Ingresso:
          {new Date(membro.dataIngresso).toLocaleDateString()}
        </p>
        <p>
          Data de Termino:{" "}
          {membro.dataTermino
            ? new Date(membro.dataTermino).toLocaleDateString()
            : "-"}
        </p>
        {/* <div className="mt-3">
          <h4> Vinculo </h4>
          <div className="d-flex gap-2">
            {membro.vinculos.map((vinculo, index) => (
              <BadgeOutline
                key={index}
                borderColor={"var(--blue)"}
                textColor={"var(--blue)"}
              >
                {vinculo}
              </BadgeOutline>
            ))}
          </div>
        </div> */}
        {/* <div className="mt-3">
          <h4> Papeis </h4>
          <div className="d-flex gap-2">
            {membro.papeis.map((papel, index) => (
              <BadgeOutline
                key={index}
                borderColor={"var(--blue)"}
                textColor={"var(--blue)"}
              >
                {papel}
              </BadgeOutline>
            ))}
          </div>
        </div> */}
        <div className="mt-3 mb-2">
          <h4> Contato </h4>
          <div className="d-flex gap-2">
            <Link to={membro.usuario.linkedin}>
              <BotaoComIcone>
                {" "}
                <FaLinkedin></FaLinkedin>LinkedIn
              </BotaoComIcone>
            </Link>
            <Link to={membro.usuario.github}>
              <BotaoComIcone>
                <FaGithub></FaGithub>GitHub
              </BotaoComIcone>
            </Link>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}
