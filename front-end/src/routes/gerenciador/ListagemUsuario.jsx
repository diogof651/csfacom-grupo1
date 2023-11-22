import React, { useEffect, useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import Form from "react-bootstrap/Form";
import {
  BsEye,
  BsFillPersonPlusFill,
  BsPersonGear,
  BsThreeDots,
} from "react-icons/bs";
import { useAuth } from "../../AutorizacaoServico";
import { BarraDePesquisa } from "../../components/BarraDePesquisa/BarraDePesquisa";
import { BotaoOutline } from "../../components/Botoes/BotaoOutline";
import { Select } from "../../components/Select/Select";

const CustomBadge = ({ status }) => {
  const badgeStyle = {
    width: "70px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: status === "Ativo" ? "#D4EDDA" : "#F5C6CB",
    borderRadius: "12px",
    fontSize: "0.8em",
    padding: "0",
    margin: "-10px 0",
  };

  const dotStyle = {
    width: "6px",
    height: "6px",
    borderRadius: "50%",
    backgroundColor: status === "Ativo" ? "#155724" : "#721C24",
    marginRight: "3px",
  };

  return (
    <span style={badgeStyle}>
      <span style={dotStyle}></span>
      {status}
    </span>
  );
};

const AdditionalBadge = ({ isAdmin }) => {
  const badgeStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
    color: isAdmin ? "#155724" : "#721C24",
    border: "1px solid #B0B0B0",
    borderRadius: "12px",
    fontSize: "0.8em",
    padding: "0 8px",
    marginLeft: "10px",
    whiteSpace: "nowrap",
  };

  const iconStyle = {
    marginRight: "5px",
  };

  const icon = isAdmin ? (
    <BsPersonGear style={iconStyle} />
  ) : (
    <BsEye style={iconStyle} />
  );

  return (
    <span style={badgeStyle}>
      {icon}
      {isAdmin ? "Administrador" : "Somente Leitura"}
    </span>
  );
};

export function ListagemUsuario() {
  const { hashUsuarioLogado } = useAuth();
  const [permissaoOption, setPermissaoOption] = useState([]);
  const [permissaoSelecionada, setPermissaoSelecionada] = useState("");
  const [usuarios, setUsuarios] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    fetch(`http://localhost:8080/api/v1/usuarios/gerenciar`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        usuarioLogado: hashUsuarioLogado(),
      },
    })
      .then((resposta) => resposta.json())
      .then((data) => {
        setUsuarios(data);
      })
      .catch((erro) => console.log(erro));
  }, []);

  useEffect(() => {
    if (permissaoOption.length === 0) {
      obterPermissoes();
    }
  }, [permissaoOption]);

  const handleApplyFilter = () => {
    fetch(
      `http://localhost:8080/api/v1/usuarios/gerenciar?nome=${searchText}&permissao=${permissaoSelecionada}`,
      {
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
      }
    )
      .then((resposta) => resposta.json())
      .then((data) => {
        setUsuarios(data);
      })
      .catch((erro) => console.log(erro));
  };

  const handlePermissaoChange = (e) => {
    setPermissaoSelecionada(e.target.value);
  };

  const handleClearFilters = () => {
    setSearchText("");
    setPermissaoSelecionada("");
    handleApplyFilter();
  };

  function obterPermissoes() {
    fetch("http://localhost:8080/api/v1/usuarios/permissoes", {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((resposta) => resposta.json())
      .then((data) => {
        setPermissaoOption(data);
      })
      .catch((erro) => console.log(erro));
  }

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mt-3">
        <h2 style={{ color: "var(--blue)", marginRight: "10px" }}>Usuarios</h2>
        <BotaoOutline
          color="var(--blue)"
          style={{
            fontSize: "0.8em",
            padding: "5px 8px",
          }}
        >
          <BsFillPersonPlusFill style={{ marginRight: "-3px" }} /> Adicionar
        </BotaoOutline>
      </div>

      <hr style={{ margin: "10px 0" }} />
      <Form className="mt-2">
        <div className="row">
          <div className="col-md-5 col-12 mb-2">
            <BarraDePesquisa />
          </div>
          <div className="col-md-3 col-6 mb-2">
            <Select
              optionDefault="Permissão"
              options={permissaoOption.map((permissao) => permissao.nome)}
              handleOptionChange={handlePermissaoChange}
              selectedOption={permissaoSelecionada}
              placeholder="Permissao"
            />
          </div>

          <div className="col-md-2 col-12">
            <button
              type="button"
              className="btn btn-primary inter-bold w-100"
              style={{ backgroundColor: "var(--blue)" }}
              onClick={handleApplyFilter}
            >
              Aplicar
            </button>
          </div>
          <div className="col-md-2 col-12">
            <button
              type="button"
              className="btn btn-outline-danger inter-bold w-100"
              onClick={handleClearFilters}
            >
              Limpar Filtros
            </button>
          </div>
        </div>
      </Form>

      <div className="d-flex flex-column mt-4" style={{ marginBottom: "20px" }}>
        {usuarios.map((usuario) => (
          <div key={usuario.id} className="d-flex align-items-center mt-3">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
                marginRight: "10px",
                marginBottom: "15px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                }}
              >
                <div
                  style={{
                    borderRadius: "50%",
                    width: "50px",
                    height: "50px",
                    backgroundColor: "#D9D9D9",
                    overflow: "hidden",
                  }}
                >
                  <img
                    src={usuario.foto}
                    alt={`Foto de ${usuario.nome}`}
                    style={{
                      width: "100%",
                      height: "auto",
                      borderRadius: "50%",
                    }}
                  />
                </div>
                <div
                  className="d-flex flex-column"
                  style={{ marginLeft: "10px" }}
                >
                  <p>{usuario.nome}</p>
                  <CustomBadge status={usuario.ativo ? "Ativo" : "Inativo"} />
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <AdditionalBadge isAdmin={usuario.permissoes} />
                <Dropdown>
                  <Dropdown.Toggle variant="light" id="dropdown-basic">
                    <BsThreeDots />
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item>Editar</Dropdown.Item>
                    <Dropdown.Item>Remover</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
