import React from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import "react-datepicker/dist/react-datepicker.css";
import "react-quill/dist/quill.snow.css";
import { Input } from "../../components/Input/Input";

export function CadastroUsuario() {
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
            paddingBottom: "5px"
          }}
        >
          Dados Pessoais
        </h1>
        <Form
          className={`d-flex justify-content-center flex-column form-container w-100`}
        //   onSubmit="" 
        >
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
          <Form.Check
            className="mt-3"
            type="checkbox"
            id="ativoCheckbox"
            label="Ativo"
          />
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
