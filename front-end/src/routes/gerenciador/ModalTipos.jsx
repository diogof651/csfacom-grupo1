import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { BotaoComFundo } from "../../components/Botoes/BotaoComFundo";
import { BotaoOutline } from "../../components/Botoes/BotaoOutline";
import { Input } from "../../components/Input/Input";
import "./../../components/OpcoesMembroDropdown/OpcoesMembroDropdown.css";

export function ModalTipos({
  titulo,
  salvar,
  showModal,
  setShowModal,
  modoEdicao,
  itemSelecionado,
}) {
  const [item, setItem] = useState("");

  useEffect(() => {
    setItem(itemSelecionado ? itemSelecionado.nome : "");
  }, [itemSelecionado]);

  const handleCloseModal = () => {
    setItem(null);
    setShowModal(false);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    var itemParaSalvar;
    if (itemSelecionado) {
      itemParaSalvar = {
        id: itemSelecionado.id,
        nome: item,
      };
    } else {
      itemParaSalvar = {
        nome: item,
      };
    }
    salvar(itemParaSalvar);
    handleCloseModal();
  };
  return (
    <>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            {modoEdicao ? "Editar " : "Adicionar "} {titulo}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-4">
          <Form onSubmit={onSubmit}>
            <Input
              value={item}
              onChange={(e) => setItem(e.target.value)}
              label={titulo}
              required={true}
              placeholder={`Digite o ${titulo.toLowerCase()}`}
              tipo={"text"}
            ></Input>

            <div className="d-flex justify-content-end gap-2 mt-4">
              <BotaoOutline color="var(--blue)" onClick={handleCloseModal}>
                Cancelar
              </BotaoOutline>
              <BotaoComFundo type="submit" color="var(--blue)">
                Salvar
              </BotaoComFundo>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}
