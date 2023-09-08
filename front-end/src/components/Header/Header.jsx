import React from "react";
import Nav from "react-bootstrap/Nav";
import styles from "./Header.module.css";
import ledesLogo from "../../assets/ledes-logo.svg";

import {
  BsFillPuzzleFill,
  BsMegaphoneFill,
  BsBoxArrowInRight,
} from "react-icons/bs";

export function Header() {
  const iconStyle = {
    width: "24px", // Defina o tamanho desejado
    height: "24px", // Defina a altura desejada (opcional)
    marginRight: "10px", // Espaçamento à direita (opcional)
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
        {" "}
        {/* Adicione ml-auto e ml-2 para empurrar 'Entrar' para a direita */}
        <Nav.Link href="/entrar" className="font-weight-bold text-white">
          <BsBoxArrowInRight style={iconStyle} />
        </Nav.Link>
      </Nav.Item>
    </header>
  );
}
