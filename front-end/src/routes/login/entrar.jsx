import React from "react";
import { Link } from "react-router-dom";
import { InputGroup, FormControl } from "react-bootstrap";
import { BsPerson, BsKey } from "react-icons/bs";

function Entrar() {
  const containerStyle = {
    background: `url("https://www.ufms.br/wp-content/uploads/2018/09/UFMS.jpg") center/cover`,
    width: "100%",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  };

  const loginBoxStyle = {
    background: "white",
    width: "300px",
    padding: "20px",
    borderRadius: "8px",
    textAlign: "center",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
    position: "relative",
    zIndex: 1,
  };

  const overlayStyle = {
    content: "",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    position: "absolute",
    width: "100%",
    height: "100%",
    top: 0,
    left: 0,
  };

  const logoStyle = {
    height: "auto",
  };

  const formStyle = {
    width: "100%", // Largura total do formulário
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  };

  const buttonStyle = {
    background: "var(--blue)",
    color: "white",
    border: "none",
    padding: "10px 0", // Ajuste o preenchimento horizontal
    borderRadius: "4px",
    cursor: "pointer",
    marginTop: "10px",
    width: "100%", // Largura total do botão
  };

  const linkStyle = {
    textDecoration: "none",
    color: "var(--blue)",
    textAlign: "left", // Alinha o texto à esquerda
    width: "100%", // Largura total do link
    marginTop: "10px", // Espaço acima do link
  };

  return (
    <div style={containerStyle}>
      <div style={overlayStyle}></div>
      <div style={loginBoxStyle}>
        <div className="logo" style={{ ...logoStyle, marginBottom: "20px" }}>
          <img
            src="/ledes-logo.svg" // Caminho relativo à pasta `public`
            alt="LEDES Logo"
            style={{ maxWidth: "80px" }}
          />
        </div>
        <form style={formStyle}>
          <InputGroup className="mb-2">
            <InputGroup.Text>
              <BsPerson />
            </InputGroup.Text>
            <FormControl />
          </InputGroup>
          <InputGroup className="mb-2">
            <InputGroup.Text>
              <BsKey />
            </InputGroup.Text>
            <FormControl type="password" />
          </InputGroup>
          <InputGroup className="mb-2">
            <Link to="/recuperarSenha" style={linkStyle}>
              Esqueci minha senha
            </Link>
          </InputGroup>
          <button style={buttonStyle}>Entrar</button>
        </form>
        <InputGroup className="mb-2">
        <Link to="/cadastroUsuario" style={linkStyle}>
          Novo por aqui? Primeiro acesso.
        </Link>
        </InputGroup>
      </div>
    </div>
  );
}

export default Entrar;
