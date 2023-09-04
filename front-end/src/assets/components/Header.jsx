import React from 'react';
import Nav from 'react-bootstrap/Nav';
import styles from './Header.module.css';
import ledesLogo from '../components/ledes-logo.svg';


import noticiasIcon from '../components/noticias.svg';
import projetosIcon from '../components/projetos.svg';
import entrarIcon from '../components/entrar.svg';


export function Header() {
    const iconStyle = {
      width: '30px', // Defina o tamanho desejado
      height: '30px', // Defina a altura desejada (opcional)
      marginRight: '5px', // Espaçamento à direita (opcional)
    };
  
    return (
        <header className={`${styles.header} d-flex justify-content-between align-items-center`}>
          <div className="d-flex align-items-center">
            <img src={ledesLogo} alt="Logotipo do Ledes" />
          </div>
          <Nav defaultActiveKey="/noticias" as="ul">
            <Nav.Item as="li">
              <Nav.Link href="/noticias" className="font-weight-bold text-white">
                <img src={noticiasIcon} alt="Ícone de Notícias" style={iconStyle} />
                Notícias
              </Nav.Link>
            </Nav.Item>
            <Nav.Item as="li">
              <Nav.Link href="/projetos" className="font-weight-bold text-white">
                <img src={projetosIcon} alt="Ícone de Projetos" style={iconStyle} />
                Projetos
              </Nav.Link>
            </Nav.Item>
            <Nav.Item as="li">
              <Nav.Link href="/entrar" className="font-weight-bold text-white">
                <img src={entrarIcon} alt="Ícone de Entrar" style={iconStyle} />
                Entrar
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </header>
      );
    }