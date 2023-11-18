import React, { useState } from "react";
import Badge from "react-bootstrap/Badge";
import Form from "react-bootstrap/Form";
import { BsFillPersonPlusFill } from "react-icons/bs";
import { BarraDePesquisa } from "../../components/BarraDePesquisa/BarraDePesquisa";
import { BotaoOutline } from "../../components/Botoes/BotaoOutline";
import { Select } from "../../components/Select/Select";

export function ListagemUsuario() {
  const [permissaoOption, setPermissaoOption] = useState([]);
  const [ativoChecked, setAtivoChecked] = useState(false);
  const [usuarios, setUsuarios] = useState([]);
  const [searchText, setSearchText] = useState("");

  const tipoHandleOptionChange = (e) => {
    setPermissaoOption(e.target.value);
  };

  const handleAtivoChange = () => {
    setAtivoChecked(!ativoChecked);
  };

  const handleApplyFilter = () => {
    // INTEGRAÇÃO ------------------------
    // fetch(
    //   `http://localhost:8080/api/v1/projetos/listagem?tipo=${tipoSelectedOption}&status=${estadoSelectedOption}&nome=${searchText}`,
    //   {
    //     method: "GET",
    //     headers: {
    //       "Content-type": "application/json",
    //     },
    //   }
    // )
    //   .then((resposta) => resposta.json())
    //   .then((data) => {
    //     setCards(data);
    //   })
    //   .catch((erro) => console.log(erro));
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
            fontSize: "0.8em", // Ajuste de tamanho
            padding: "5px 8px", // Ajuste de padding
          }}
        >
          <BsFillPersonPlusFill style={{ marginRight: "-3px" }} /> Adicionar
        </BotaoOutline>
      </div>

      <hr style={{ margin: "10px 0" }} />
      <Form className="mt-2">
        <div className="row">
          <div className="col-md-5 col-12 mb-2">
            <BarraDePesquisa
            //   handleSearchChange={handleSearchChange}
            //   searchText={searchText}
            />
          </div>
          <div className="col-md-3 col-6 mb-2">
            <Select
              optionDefault={"Permissões"}
              options={permissaoOption}
              //   handleOptionChange={tipoHandleOptionChange}
              //   selectedOption={tipoSelectedOption}
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

      <div className="d-flex flex-column mt-4">
        {usuarios.map((usuario) => (
          <div key={usuario.id} className="d-flex align-items-center mt-3">
            <div
              style={{
                borderRadius: "50%",
                width: "50px",
                height: "50px",
                backgroundColor: "#D9D9D9",
                overflow: "hidden",
                marginRight: "10px",
              }}
            >
              {/* Adicione a imagem padrão dentro do círculo cinza */}
              <img
                src="url_da_foto_padrao.jpg" // Substitua pela URL da foto padrão
                alt={`Foto de ${usuario.nome}`}
                style={{ width: "100%", height: "auto", borderRadius: "50%" }}
              />
            </div>
            <div className="d-flex flex-column">
              <p>{usuario.nome}</p>
              <Badge bg={usuario.ativo ? "success" : "danger"}>
                {usuario.ativo ? "Ativo" : "Inativo"}
              </Badge>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
