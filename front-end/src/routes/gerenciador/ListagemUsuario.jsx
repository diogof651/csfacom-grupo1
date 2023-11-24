import React, { useEffect, useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import Form from "react-bootstrap/Form";
import {
  BsEye,
  BsFillPersonPlusFill,
  BsPersonGear,
  BsThreeDotsVertical,
} from "react-icons/bs";
import { useNavigate } from "react-router";
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
  const navigate = useNavigate();
  const { hashUsuarioLogado } = useAuth();
  const [permissaoOption, setPermissaoOption] = useState([]);
  const [permissaoSelecionada, setPermissaoSelecionada] = useState("");
  const [usuarios, setUsuarios] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    obterUsuarios();
  }, []);

  function obterUsuarios() {
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
  }

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

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
          usuarioLogado: hashUsuarioLogado(),
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

  function desativar(id) {
    fetch(`http://localhost:8080/api/v1/usuarios/${id}/desativar`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        usuarioLogado: hashUsuarioLogado(),
      },
    })
      .then((resposta) => obterUsuarios())
      .catch((erro) => console.log(erro));
  }

  function ativar(id) {
    fetch(`http://localhost:8080/api/v1/usuarios/${id}/ativar`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        usuarioLogado: hashUsuarioLogado(),
      },
    })
      .then((resposta) => obterUsuarios())
      .catch((erro) => console.log(erro));
  }

  function editar(idUsuario) {
    navigate(`/cadastroUsuario/${idUsuario}`);
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
          onClick={() => navigate(`/cadastroUsuario/`)}
        >
          <BsFillPersonPlusFill style={{ marginRight: "-3px" }} /> Adicionar
        </BotaoOutline>
      </div>

      <hr style={{ margin: "10px 0" }} />
      <Form className="mt-2">
        <div className="row">
          <div className="col-md-5 col-12 mb-2">
            <BarraDePesquisa handleSearchChange={handleSearchChange} />
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
        {usuarios.length > 0 ? (
          usuarios.map((usuario) => (
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
                      width: "50px",
                      height: "50px",
                      borderRadius: "50%",
                      backgroundColor: "#ccc",
                    }}
                  >
                    {usuario.foto && (
                      <img
                        src={
                          usuario.foto != null && usuario.foto
                            ? `data:image/jpeg;base64,${usuario.foto}`
                            : ""
                        }
                        alt="Foto de perfil"
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          borderRadius: "50%",
                        }}
                      />
                    )}
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
                  <div className="d-flex align-items-center gap-1">
                    <Dropdown align={{ lg: "end" }} drop="start">
                      <Dropdown.Toggle variant="light" id="dropdown-basic">
                        <BsThreeDotsVertical />
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item onClick={() => editar(usuario.id)}>
                          Editar
                        </Dropdown.Item>
                        {usuario.ativo ? (
                          <Dropdown.Item onClick={() => desativar(usuario.id)}>
                            Desativar
                          </Dropdown.Item>
                        ) : (
                          <Dropdown.Item onClick={() => ativar(usuario.id)}>
                            Ativar
                          </Dropdown.Item>
                        )}
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>Nenhum usuário encontrado.</p>
        )}
      </div>
    </>
  );
}
