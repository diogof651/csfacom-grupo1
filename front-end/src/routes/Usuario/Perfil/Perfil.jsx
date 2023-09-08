import React, { useRef } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import "react-datepicker/dist/react-datepicker.css";
import "react-quill/dist/quill.snow.css";
import { Input } from "../../../components/Input/Input";
import { FotoPerfil } from "../../../components/FotoPerfil/FotoPerfil";

export function Perfil() {
  const iconStyle = {
    width: "24px", // Defina o tamanho desejado
    height: "24px", // Defina a altura desejada (opcional)
  };

  return (
    <>
      <Container
        className="d-flex flex-column"
        style={{ width: "50vw", marginTop: "40px" }}
      >
        <h1
          style={{
            borderBottom: "1px solid #ccc",
            marginBottom: "10px",
            fontWeight: "bold",
            paddingBottom: "5px",
          }}
        >
          Perfil
        </h1>
        <Form
          className={`d-flex justify-content-center flex-column form-container w-100`}
          //   onSubmit=""
        >
          <div className="mx-auto mt-2 mb-2">
            <FotoPerfil></FotoPerfil>
          </div>

          <Input
            label={"Nome"}
            required={true}
            placeholder={"Digite seu nome"}
            tipo={"text"}
          ></Input>
          <Input
            label={"Email"}
            required={true}
            placeholder={"Digite seu email"}
            tipo={"email"}
          ></Input>
          <Input
            label={"Link"}
            placeholder={"Digite um link (exemplo: linkedin, github, etc...)"}
            tipo={"email"}
          ></Input>

          <div className="d-flex justify-content-end gap-2">
            <Button
              style={{
                backgroundColor: "transparent",
                borderColor: "var(--blue)",
                color: "var(--blue)",
              }}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              style={{
                backgroundColor: "var(--blue)",
                borderColor: "var(--blue)",
              }}
            >
              Cadastrar
            </Button>
          </div>
        </Form>
      </Container>
    </>
  );
}
