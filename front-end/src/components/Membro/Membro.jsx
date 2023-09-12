import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import {
  Badge,
  Col,
  Container,
  Image,
  OverlayTrigger,
  Popover,
  Row,
} from "react-bootstrap";

import { BsThreeDotsVertical } from "react-icons/bs";

export default function Membro({ nome, papeis, imagemSrc }) {
  return (
    <Container className="mt-4">
      <Row className="align-items-center">
        <Col xs={2}>
          {imagemSrc ? (
            <Image src={imagemSrc} alt="Foto de Perfil" roundedCircle fluid />
          ) : (
            <div
              className="rounded-circle d-flex align-items-center justify-content-center"
              style={{
                width: "50px",
                height: "50px",
                backgroundColor: "#ccc",
              }}
            ></div>
          )}
        </Col>
        <Col>
          <div>
            <strong>{nome}</strong>
          </div>
          <div>
            {papeis.map((papel, index) => (
              <Badge key={index} variant="secondary" className="me-2">
                {papel}
              </Badge>
            ))}
          </div>
        </Col>
        <Col xs={1} className="text-end">
          <span className="text-muted">
            <BsThreeDotsVertical></BsThreeDotsVertical>
          </span>
        </Col>
      </Row>
    </Container>
  );
}
