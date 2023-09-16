import React from "react";
import { Dropdown } from "react-bootstrap";
import "./OpcoesMembroDropdown.css";
import { BsThreeDotsVertical } from "react-icons/bs";


export function OpcoesMembroDropdown({idProjeto, idMembro}) {
  return (
    <Dropdown align={{ lg: 'end' }}>
      <Dropdown.Toggle variant="light" id="dropdown-basic">
        <BsThreeDotsVertical></BsThreeDotsVertical>
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item href="#action1">Editar</Dropdown.Item>
        <Dropdown.Item href="#action2">Desativar</Dropdown.Item>
        <Dropdown.Item href="#action3">Remover</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}
