import React, { useState } from "react";
import { Link } from "react-router-dom";
import { InputGroup, FormControl } from "react-bootstrap";
import { BsPerson, BsKey } from "react-icons/bs";

function Entrar() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

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
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  };

  const buttonStyle = {
    background: "var(--blue)",
    color: "white",
    border: "none",
    padding: "10px 0",
    borderRadius: "4px",
    cursor: "pointer",
    marginTop: "10px",
    width: "100%",
  };

  const linkStyle = {
    textDecoration: "none",
    color: "var(--blue)",
    textAlign: "left",
    width: "100%",
    marginTop: "10px",
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleLogin = () => {
    setEmailError("");
    setPasswordError("");

    if (!validateEmail(email)) {
      setEmailError("Email inválido");
      return;
    }

    // Simulando uma autenticação falhada para teste. Substitua isso pela lógica real.
    const authFailed = true;

    if (authFailed) {
      setEmailError("Email ou senha incorretos");
      // Ou você pode definir a mensagem de erro do password, dependendo do que deseja destacar.
      // setPasswordError("Email ou senha incorretos");
      return;
    }
  };

  return (
    <div style={containerStyle}>
      <div style={overlayStyle}></div>
      <div style={loginBoxStyle}>
        <div className="logo" style={{ ...logoStyle, marginBottom: "20px" }}>
          <img
            src="/ledes-logo.svg"
            alt="LEDES Logo"
            style={{ maxWidth: "80px" }}
          />
        </div>
        <form style={formStyle}>
          <InputGroup className="mb-2">
            <InputGroup.Text>
              <BsPerson />
            </InputGroup.Text>
            <FormControl
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              isInvalid={emailError.length > 0}
            />
            <FormControl.Feedback type="invalid">
              {emailError}
            </FormControl.Feedback>
          </InputGroup>
          <InputGroup className="mb-2">
            <InputGroup.Text>
              <BsKey />
            </InputGroup.Text>
            <FormControl
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              isInvalid={passwordError.length > 0}
            />
            <FormControl.Feedback type="invalid">
              {passwordError}
            </FormControl.Feedback>
          </InputGroup>
          <InputGroup className="mb-2">
            <Link to="/recuperarSenha" style={linkStyle}>
              Esqueci minha senha
            </Link>
          </InputGroup>
          <button onClick={handleLogin} style={buttonStyle}>
            Entrar
          </button>
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
