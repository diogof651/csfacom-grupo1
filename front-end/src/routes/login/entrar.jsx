import React, { useState } from "react";
import { FormControl, InputGroup } from "react-bootstrap";
import { BsKey, BsPerson } from "react-icons/bs";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { useAuth } from "./../../AutorizacaoServico";

export default function Entrar() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [emailError, setEmailError] = useState("");
  const [loginError, setLoginError] = useState("");
  const [senhaError, setSenhaError] = useState("");
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setEmailError("");
    setSenhaError("");
    setLoginError("");

    if (email.length <= 0 || !validateEmail(email)) {
      setEmailError("Email inválido");
      return;
    }

    if (senha.length <= 0) {
      setSenhaError("Campo obrigatório");
      return;
    }

    const data = {
      email,
      senha,
    };

    fetch("http://localhost:8080/api/v1/usuarios/login", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((resposta) => {
        // nao autorizado (credenciais incorretas)
        if (resposta.status === 401) {
          resposta.json().then((dados) => {
            setLoginError(dados.resposta);
          });
        }
        if (resposta.status === 200) {
          resposta.json().then((dados) => {
            login(dados.resposta);
            navigate("/");
          });
        }
      })
      .catch((erro) => console.log(erro));
  };

  const containerStyle = {
    background: `url("https://www.ufms.br/wp-content/uploads/2018/09/UFMS.jpg") center/cover`,
  };

  const overlayStyle = {
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "85vh",
    maxHeight: "100vh",
  };

  const loginBoxStyle = {
    background: "white",
    width: "300px",
    padding: "20px",
    borderRadius: "8px",
    textAlign: "center",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
    margin: "40px",
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

  return (
    <div style={containerStyle}>
      <div style={overlayStyle}>
        <div style={loginBoxStyle}>
          <div className="logo" style={{ ...logoStyle, marginBottom: "20px" }}>
            <img
              src="/ledes-logo.svg"
              alt="LEDES Logo"
              style={{ maxWidth: "80px" }}
            />
          </div>
          <form style={formStyle}>
            <div>{loginError}</div>
            <InputGroup className="mb-2">
              <InputGroup.Text>
                <BsPerson />
              </InputGroup.Text>
              <FormControl
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <div>{emailError}</div>
            </InputGroup>
            <InputGroup className="mb-2">
              <InputGroup.Text>
                <BsKey />
              </InputGroup.Text>
              <FormControl
                type="password"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
              />
              <div>{senhaError}</div>
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
    </div>
  );
}
