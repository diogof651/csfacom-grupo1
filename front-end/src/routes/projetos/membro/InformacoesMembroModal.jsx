import React from "react";
import Image from "react-bootstrap/Image";
import Modal from "react-bootstrap/Modal";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { Link } from "react-router-dom";
import BadgeOutline from "../../../components/BadgeOutline/BadgeOutline";
import { BotaoComIcone } from "../../../components/Botoes/BotaoComIcone";

export default function InformacoesMembroModal({ membro, show, onClose }) {
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
          {membro.foto ? (
            <Image src={imagemSrc} alt="Foto de Perfil" roundedCircle fluid />
          ) : (
            <div
              className="rounded-circle d-flex align-items-center justify-content-end m-0"
              style={{
                width: "50px",
                height: "50px",
                backgroundColor: "#ccc",
              }}
            ></div>
          )}
          <div className="d-flex flex-column">
            <h4 className="m-0">{membro.nome}</h4>
            <p>{membro.email}</p>
          </div>
        </div>

        <p>Data de Ingresso: {membro.ingressDate}</p>
        <p>Data de Termino: {membro.endDate ?? "-"}</p>
        <div className="mt-3">
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
        </div>
        <div className="mt-3">
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
        </div>
        <div className="mt-3 mb-2">
          <h4> Contato </h4>
          <div className="d-flex gap-2">
            <Link to={membro.linkedin}>
              <BotaoComIcone>
                {" "}
                <FaLinkedin></FaLinkedin>LinkedIn
              </BotaoComIcone>
            </Link>
            <Link to={membro.github}>
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
