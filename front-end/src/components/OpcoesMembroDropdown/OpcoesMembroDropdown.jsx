import React from "react";
import { Dropdown } from "react-bootstrap";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useNavigate } from "react-router";
import "./OpcoesMembroDropdown.css";

export function OpcoesMembroDropdown({ idProjeto, idMembro }) {
  const navigate = useNavigate();

  function editar() {
    navigate("/editarMembro/" + idMembro);
  }

  function desativar() {
    fetch(`http://localhost:8080/api/v1/membros/${idMembro}/desativar`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
    })
      .then(() => {
        navigate("/projeto/" + idProjeto);
        window.location.reload();
      })
      .catch((erro) => console.log(erro));
  }

  function remover() {
    fetch(`http://localhost:8080/api/v1/membros/${idMembro}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
      },
    })
      .then(() => {
        navigate("/projeto/" + idProjeto);
        window.location.reload();
      })
      .catch((erro) => console.log(erro));
  }

  return (
    <Dropdown align={{ lg: "end" }}>
      <Dropdown.Toggle variant="light" id="dropdown-basic">
        <BsThreeDotsVertical></BsThreeDotsVertical>
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item onClick={editar}>Editar</Dropdown.Item>
        <Dropdown.Item onClick={desativar}>Desativar</Dropdown.Item>
        <Dropdown.Item onClick={remover}>Remover</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}
