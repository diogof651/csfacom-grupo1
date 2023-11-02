import React from "react";
import Nav from "react-bootstrap/Nav";
import {
  BsBoxArrowInRight,
  BsFillPuzzleFill,
  BsMegaphoneFill,
  BsPersonCircle,
} from "react-icons/bs";
import ledesLogo from "../../assets/ledes-logo.svg";
import { useAuth } from "./../../AutorizacaoServico";
import styles from "./Header.module.css";

export function Header() {
  const iconStyle = {
    width: "24px", // Defina o tamanho desejado
    height: "24px", // Defina a altura desejada (opcional)
    marginRight: "10px", // Espaçamento à direita (opcional)
  };

  const { usuarioLogado, isAuthenticated, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <header
      className={`${styles.header} d-flex align-items-center justify-content-between`}
    >
      <div className="d-flex align-items-center">
        <img src={ledesLogo} alt="Logotipo do Ledes" />
        <Nav defaultActiveKey="/noticias" as="ul" className="ml-3">
          <Nav.Item as="li">
            <Nav.Link href="/noticias" className="font-weight-bold text-white">
              <BsMegaphoneFill style={iconStyle} />
              Notícias
            </Nav.Link>
          </Nav.Item>
          <Nav.Item as="li">
            <Nav.Link href="/projetos" className="font-weight-bold text-white">
              <BsFillPuzzleFill style={iconStyle} />
              Projetos
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </div>
      <Nav.Item as="lu" className="ml-auto ml-5">
        {usuarioLogado() || isAuthenticated ? (
          <div className="d-flex align-items-center gap-3">
            <Nav.Link href="/perfil" className="font-weight-bold text-white">
              <BsPersonCircle style={iconStyle} /> Perfil
            </Nav.Link>
            <Nav.Link
              href="#"
              className="font-weight-bold text-white"
              onClick={handleLogout}
            >
              <BsBoxArrowInRight style={iconStyle} />
              Sair
            </Nav.Link>
          </div>
        ) : (
          <Nav.Link href="/entrar" className="font-weight-bold text-white">
            Entrar
          </Nav.Link>
        )}
      </Nav.Item>
    </header>
  );
}
