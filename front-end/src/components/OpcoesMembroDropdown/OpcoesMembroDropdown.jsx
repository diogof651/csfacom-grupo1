import React from "react";
import { Dropdown } from "react-bootstrap";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useNavigate } from "react-router";
import "./OpcoesMembroDropdown.css";
import { useAuth } from "../../AutorizacaoServico";

export function OpcoesMembroDropdown({ idProjeto, idMembro, ativo }) {
  const navigate = useNavigate();
  const { hashUsuarioLogado } = useAuth();

  const editar = () => {
    navigate(`/editarMembro/projeto/${idProjeto}/membro/${idMembro}`);
  };

  const handleToggleStatus = () => {
    if (ativo) {
      fetch(`http://localhost:8080/api/v1/membros/${idMembro}/desativar`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          usuarioLogado: hashUsuarioLogado(),
        },
      })
        .then(() => {
          navigate(`/projeto/${idProjeto}`);
          window.location.reload();
        })
        .catch((erro) => console.log(erro));
    } else {
      fetch(`http://localhost:8080/api/v1/membros/${idMembro}/ativar`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          usuarioLogado: hashUsuarioLogado(),
        },
      })
        .then(() => {
          navigate(`/projeto/${idProjeto}`);
          window.location.reload();
        })
        .catch((erro) => console.log(erro));
    }
  };

  const remover = () => {
    fetch(`http://localhost:8080/api/v1/membros/${idMembro}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application.json",
        usuarioLogado: hashUsuarioLogado(),
      },
    })
      .then(() => {
        navigate(`/projeto/${idProjeto}`);
        window.location.reload();
      })
      .catch((erro) => console.log(erro));
  };

  return (
    <Dropdown align={{ lg: "end" }}>
      <Dropdown.Toggle variant="light" id="dropdown-basic">
        <BsThreeDotsVertical />
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item onClick={editar}>Editar</Dropdown.Item>
        <Dropdown.Item onClick={handleToggleStatus}>
          {ativo ? "Desativar" : "Ativar"}
        </Dropdown.Item>
        <Dropdown.Item onClick={remover}>Remover</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}
