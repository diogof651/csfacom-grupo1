import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { Container } from "react-bootstrap";
import BadgeOutline from "../BadgeOutline/BadgeOutline";

import { OpcoesMembroDropdown } from "../OpcoesMembroDropdown/OpcoesMembroDropdown";

export default function Membro({ membro, selecionar, idProjeto }) {
  const fotoPerfil = membro.usuario.fotoPerfil;
  return (
    <Container className="mt-4">
      <div className="d-flex align-items-center w-100 justify-content-between">
        <section
          className="d-flex align-items-center w-100"
          onClick={selecionar}
        >
          <div className="col-md-1 col-2 mb-2 p-0">
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
          </div>
          <div className="col-md-10 col-8 mb-2 p-0">
            <strong>{membro.usuario.nome}</strong>
            <div className="d-flex gap-1 flex-wrap">
              {membro.papeis.map((papel, index) => (
                <BadgeOutline
                  key={index}
                  borderColor={"var(--blue)"}
                  textColor={"var(--blue)"}
                >
                  {papel.nome}
                </BadgeOutline>
              ))}
            </div>
          </div>
        </section>
        <div className="col-md-1 col-2 mb-2 p-0 text-end">
          <OpcoesMembroDropdown
            idProjeto={idProjeto}
            idMembro={membro.id}
            ativo={membro.ativo}
          ></OpcoesMembroDropdown>
        </div>
      </div>
    </Container>
  );
}
