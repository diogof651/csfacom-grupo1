import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { Container, Image } from "react-bootstrap";

import BadgeOutline from "../BadgeOutline/BadgeOutline";
import { OpcoesMembroDropdown } from "../OpcoesMembroDropdown/OpcoesMembroDropdown";

export default function Membro({ membro }) {
  return (
    <Container className="mt-4">
      <div className="d-flex justify-content-between align-items-center w-100 justify-content-between">
        <div className="col-md-1 col-2 mb-2 p-0">
          {membro.foto ? (
            <Image src={membro.foto} alt="Foto de Perfil" roundedCircle fluid />
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
        </div>
        <div className="col-md-10 col-8 mb-2 p-0">
          <strong>{membro.nome}</strong>
          <div className="d-flex gap-1 flex-wrap">
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
        <div className="col-md-1 col-2 mb-2 p-0 text-end">
          <OpcoesMembroDropdown
            idProjeto={0}
            idMembro={0}
          ></OpcoesMembroDropdown>
        </div>
      </div>
    </Container>
  );
}
