import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import { BsFillPersonPlusFill, BsThreeDots, BsPersonGear, BsEye } from "react-icons/bs";
import { BarraDePesquisa } from "../../components/BarraDePesquisa/BarraDePesquisa";
import { BotaoOutline } from "../../components/Botoes/BotaoOutline";
import { Select } from "../../components/Select/Select";
import * as faker from "faker";
import Dropdown from "react-bootstrap/Dropdown";

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

  const icon = isAdmin ? <BsPersonGear style={iconStyle} /> : <BsEye style={iconStyle} />;

  return (
    <span style={badgeStyle}>
      {icon}
      {isAdmin ? "Administrador" : "Somente Leitura"}
    </span>
  );
};

export function ListagemUsuario() {
  const [permissaoOption, setPermissaoOption] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    // Generating random user data for demonstration
    const randomUsers = Array.from({ length: 5 }, (_, index) => ({
      id: index + 1,
      nome: faker.name.findName(),
      ativo: Math.random() < 0.5, // Randomly setting active or inactive
      isAdmin: Math.random() < 0.5, // Randomly setting isAdmin
    }));
    setUsuarios(randomUsers);
  }, []);

  const tipoHandleOptionChange = (e) => {
    setPermissaoOption(e.target.value);
  };

  const handleApplyFilter = () => {
    // Fetch logic here if needed
  };

  const handleClearFilters = () => {
    setSearchText("");
    handleApplyFilter();
  };

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
            <Select options={permissaoOption} />
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

      <div className="d-flex flex-column mt-4">
        {usuarios.map((usuario) => (
          <div key={usuario.id} className="d-flex align-items-center mt-3">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
                marginRight: "10px",
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
                    src={faker.image.avatar()}
                    alt={`Foto de ${usuario.nome}`}
                    style={{ width: "100%", height: "auto", borderRadius: "50%" }}
                  />
                </div>
                <div className="d-flex flex-column" style={{ marginLeft: "10px" }}>
                  <p>{usuario.nome}</p>
                  <CustomBadge status={usuario.ativo ? "Ativo" : "Inativo"} />
                </div>
              </div>
              {/* Badges and three dots aligned vertically */}
              <div style={{ display: "flex", alignItems: "center" }}>
                <AdditionalBadge isAdmin={usuario.isAdmin} />
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
