import React, { useState } from "react";
import { Dropdown } from "react-bootstrap";
import { BsPlusCircle, BsThreeDotsVertical } from "react-icons/bs";
import { BotaoOutline } from "../../components/Botoes/BotaoOutline";
import "./../../components/OpcoesMembroDropdown/OpcoesMembroDropdown.css";
import { ModalTipos } from "./ModalTipos";

export function Listagem({ titulo, lista, salvar, desativar, ativar }) {
  const [showModal, setShowModal] = useState(false);
  const [modoEdicao, setModoEdicao] = useState(false);
  const [itemSelecionado, setItemSelecionado] = useState(null);

  const handleOpenModal = (item) => {
    setShowModal(true);
    setModoEdicao(true);
    setItemSelecionado(item);
  };

  const handleOpenAdicionarModal = () => {
    setModoEdicao(false);
    setShowModal(true);
  };

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mt-3">
        <h2 style={{ color: "var(--blue)", marginRight: "10px" }}>{titulo}</h2>
        <BotaoOutline
          color="var(--blue)"
          style={{
            fontSize: "0.8em", // Ajuste de tamanho
            padding: "5px 8px", // Ajuste de padding
          }}
          onClick={handleOpenAdicionarModal}
        >
          <BsPlusCircle style={{ marginRight: "-3px" }} /> Adicionar
        </BotaoOutline>
      </div>

      <hr style={{ margin: "10px 0" }} />

      {lista.map((item) => (
        <div
          key={item.id}
          className="d-flex justify-content-between align-items-center mt-2"
        >
          <span>{item.nome}</span>
          <div className="d-flex align-items-center gap-1">
            <Dropdown align={{ lg: "end" }} drop="start">
              <Dropdown.Toggle variant="light" id="dropdown-basic">
                <BsThreeDotsVertical />
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => handleOpenModal(item)}>
                  Editar
                </Dropdown.Item>
                {item.ativo ? (
                  <Dropdown.Item onClick={() => desativar(item.id)}>
                    Desativar
                  </Dropdown.Item>
                ) : (
                  <Dropdown.Item onClick={() => ativar(item.id)}>
                    Ativar
                  </Dropdown.Item>
                )}
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
      ))}

      <ModalTipos
        titulo={titulo}
        salvar={salvar}
        showModal={showModal}
        setShowModal={setShowModal}
        modoEdicao={modoEdicao}
        itemSelecionado={itemSelecionado}
      />
    </>
  );
}
