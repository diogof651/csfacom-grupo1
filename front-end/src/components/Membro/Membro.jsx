import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { Badge, Container, Image } from "react-bootstrap";

import { OpcoesMembroDropdown } from "../OpcoesMembroDropdown/OpcoesMembroDropdown";

export default function Membro({ nome, papeis, imagemSrc }) {
  return (
    <Container className="mt-4">
      <div className="d-flex justify-content-between align-items-center w-100 justify-content-between">
        <div className="col-md-1 col-2 mb-2 p-0">
          {imagemSrc ? (
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
        </div>
        <div className="col-md-10 col-8 mb-2 p-0">
          <strong>{nome}</strong>
          <div className="d-flex gap-1 flex-wrap">
            {papeis.map((papel, index) => (
              <Badge key={index} variant="secondary" className="me-2">
                {papel}
              </Badge>
            ))}
          </div>
        </div>
        <div className="col-md-1 col-2 mb-2 p-0 text-end">
          <OpcoesMembroDropdown idProjeto={0} idMembro={0}></OpcoesMembroDropdown>
        </div>
      </div>
    </Container>
  );
}
