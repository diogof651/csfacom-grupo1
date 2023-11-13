import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import { Select } from "../../components/Select/Select";
import { BsFillPersonPlusFill, BsPencilSquare, BsTrash3 } from "react-icons/bs";
import { BarraDePesquisa } from "../../components/BarraDePesquisa/BarraDePesquisa";
import Badge from "react-bootstrap/Badge";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Botao } from "../../components/Botoes/Botao";
import { BotaoOutline } from "../../components/Botoes/BotaoOutline";

export function Gerenciar() {
  const [abaAtiva, setAbaAtiva] = useState("usuarios");
  const [tipoSelectedOption, setTipoSelectedOption] = useState("");
  const [estadoSelectedOption, setEstadoSelectedOption] = useState("");
  const [ativoChecked, setAtivoChecked] = useState(false);
  const [usuarios, setUsuarios] = useState([]);
  const [mostrarUsuarios, setMostrarUsuarios] = useState(false);
  const [showNovoVinculoModal, setShowNovoVinculoModal] = useState(false);
  const [showEditarVinculoModal, setShowEditarVinculoModal] = useState(false);
  const [novoVinculo, setNovoVinculo] = useState("");
  const [tiposDeVinculo, setTiposDeVinculo] = useState([]);
  const [vinculoEmEdicao, setVinculoEmEdicao] = useState(null);

  const [showNovoPapelModal, setShowNovoPapelModal] = useState(false);
  const [showEditarPapelModal, setShowEditarPapelModal] = useState(false);
  const [novoPapel, setNovoPapel] = useState("");
  const [tiposDePapel, setTiposDePapel] = useState([]);
  const [papelEmEdicao, setPapelEmEdicao] = useState(null);

const [showNovoProjetoModal, setShowNovoProjetoModal] = useState(false);
const [showEditarProjetoModal, setShowEditarProjetoModal] = useState(false);
const [novoProjeto, setNovoProjeto] = useState("");
const [tiposDeProjeto, setTiposDeProjeto] = useState([]);
const [projetoEmEdicao, setProjetoEmEdicao] = useState(null);

  const selecionarAba = (aba) => {
    setAbaAtiva(aba);
  };

  const tipoHandleOptionChange = (e) => {
    setTipoSelectedOption(e.target.value);
  };

  const estadoHandleOptionChange = (e) => {
    setEstadoSelectedOption(e.target.value);
  };

  const handleAtivoChange = () => {
    setAtivoChecked(!ativoChecked);
  };

  const handleAplicar = () => {
    // Simulação de dados de usuários após aplicar os filtros
    const usuariosFiltrados = [
      { id: 1, nome: "Usuário 1", ativo: true },
      { id: 2, nome: "Usuário 2", ativo: false },
      // Adicione mais usuários conforme necessário
    ];

    setUsuarios(usuariosFiltrados);
    setMostrarUsuarios(true);
  };

  const handleShowNovoVinculoModal = () => {
    setShowNovoVinculoModal(true);
    setVinculoEmEdicao(null); // Limpa o estado de edição quando abre o modal
  };

  const handleShowEditarVinculoModal = () => {
    setShowEditarVinculoModal(true);
  };

  const handleCloseVinculoModal = () => {
    setShowNovoVinculoModal(false);
    setShowEditarVinculoModal(false);
    setNovoVinculo(""); // Limpa o campo de novo vínculo ao fechar o modal
  };

  const handleSalvarVinculo = () => {
    // Lógica para salvar o vínculo (tanto adição quanto edição)
    const novoTipo = novoVinculo.trim(); // Remove espaços em branco no início e no final

    if (novoTipo !== "") {
      const tiposAtualizados = vinculoEmEdicao !== null
        ? tiposDeVinculo.map((v) => (v === vinculoEmEdicao ? novoTipo : v))
        : tiposDeVinculo.includes(novoTipo)
          ? tiposDeVinculo.map((v) => (v === novoTipo ? novoVinculo : v))
          : [...tiposDeVinculo, novoTipo];

      setTiposDeVinculo(tiposAtualizados);
      setNovoVinculo("");
      setVinculoEmEdicao(null);
      handleCloseVinculoModal();
    }
  };

  const handleEditarVinculo = (vinculo) => {
    // Lógica para editar o vínculo
    setNovoVinculo(vinculo); // Preenche o campo de novo vínculo com o texto atual
    setVinculoEmEdicao(vinculo);
    handleShowEditarVinculoModal();
  };

  const handleRemoverVinculo = (vinculo) => {
    // Lógica para remover o vínculo
    const novosTiposDeVinculo = tiposDeVinculo.filter((v) => v !== vinculo);
    setTiposDeVinculo(novosTiposDeVinculo);
  };

  const handleSalvarEdicaoVinculo = () => {
    const novoTipo = novoVinculo.trim();

    if (novoTipo !== "") {
      const tiposAtualizados = tiposDeVinculo.map((v) =>
        v === vinculoEmEdicao ? novoTipo : v
      );

      setTiposDeVinculo(tiposAtualizados);
      handleCloseVinculoModal();
    }
  };

  const handleShowNovoPapelModal = () => {
    setShowNovoPapelModal(true);
    setPapelEmEdicao(null);
  };

  const handleShowEditarPapelModal = () => {
    setShowEditarPapelModal(true);
  };

  const handleClosePapelModal = () => {
    setShowNovoPapelModal(false);
    setShowEditarPapelModal(false);
    setNovoPapel("");
  };

  const handleSalvarPapel = () => {
    const novoPapelTrimmed = novoPapel.trim();

    if (novoPapelTrimmed !== "") {
      const papeisAtualizados = papelEmEdicao !== null
        ? tiposDePapel.map((p) => (p === papelEmEdicao ? novoPapelTrimmed : p))
        : tiposDePapel.includes(novoPapelTrimmed)
          ? tiposDePapel.map((p) => (p === novoPapelTrimmed ? novoPapel : p))
          : [...tiposDePapel, novoPapelTrimmed];

      setTiposDePapel(papeisAtualizados);
      setNovoPapel("");
      setPapelEmEdicao(null);
      handleClosePapelModal();
    }
  };

  const handleEditarPapel = (papel) => {
    setNovoPapel(papel);
    setPapelEmEdicao(papel);
    handleShowEditarPapelModal();
  };

  const handleRemoverPapel = (papel) => {
    const novosTiposDePapel = tiposDePapel.filter((p) => p !== papel);
    setTiposDePapel(novosTiposDePapel);
  };

  const handleSalvarEdicaoPapel = () => {
    const novoPapelTrimmed = novoPapel.trim();

    if (novoPapelTrimmed !== "") {
      const papeisAtualizados = tiposDePapel.map((p) =>
        p === papelEmEdicao ? novoPapelTrimmed : p
      );

      setTiposDePapel(papeisAtualizados);
      handleClosePapelModal();
    }
  };

  const handleShowNovoProjetoModal = () => {
    setShowNovoProjetoModal(true);
    setProjetoEmEdicao(null);
  };
  
  const handleShowEditarProjetoModal = () => {
    setShowEditarProjetoModal(true);
  };
  
  const handleCloseProjetoModal = () => {
    setShowNovoProjetoModal(false);
    setShowEditarProjetoModal(false);
    setNovoProjeto("");
  };
  
  const handleSalvarProjeto = () => {
    const novoProjetoTrimmed = novoProjeto.trim();
  
    if (novoProjetoTrimmed !== "") {
      const projetosAtualizados = projetoEmEdicao !== null
        ? tiposDeProjeto.map((p) => (p === projetoEmEdicao ? novoProjetoTrimmed : p))
        : tiposDeProjeto.includes(novoProjetoTrimmed)
          ? tiposDeProjeto.map((p) => (p === novoProjetoTrimmed ? novoProjeto : p))
          : [...tiposDeProjeto, novoProjetoTrimmed];
  
      setTiposDeProjeto(projetosAtualizados);
      setNovoProjeto("");
      setProjetoEmEdicao(null);
      handleCloseProjetoModal();
    }
  };
  
  const handleEditarProjeto = (projeto) => {
    setNovoProjeto(projeto);
    setProjetoEmEdicao(projeto);
    handleShowEditarProjetoModal();
  };
  
  const handleRemoverProjeto = (projeto) => {
    const novosTiposDeProjeto = tiposDeProjeto.filter((p) => p !== projeto);
    setTiposDeProjeto(novosTiposDeProjeto);
  };
  
  const handleSalvarEdicaoProjeto = () => {
    const novoProjetoTrimmed = novoProjeto.trim();
  
    if (novoProjetoTrimmed !== "") {
      const projetosAtualizados = tiposDeProjeto.map((p) =>
        p === projetoEmEdicao ? novoProjetoTrimmed : p
      );
  
      setTiposDeProjeto(projetosAtualizados);
      handleCloseProjetoModal();
    }
  };

  return (
    <Container style={{ marginTop: "40px" }}>
      <h1 style={{ fontFamily: "Inter", fontWeight: "bold" }}>Gerenciar</h1>
      <div className="d-flex justify-content-between align-items-center">
        <ul className="nav nav-tabs" role="tablist">
          <li className="nav-item" role="presentation">
            <button
              onClick={() => selecionarAba("usuarios")}
              className={`nav-link ${abaAtiva === "usuarios" ? "active" : ""}`}
            >
              Usuários
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button
              onClick={() => selecionarAba("membros")}
              className={`nav-link ${abaAtiva === "membros" ? "active" : ""}`}
            >
              Membros
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button
              onClick={() => selecionarAba("tipo-de-projeto")}
              className={`nav-link ${abaAtiva === "tipo-de-projeto" ? "active" : ""}`}
            >
              Tipos de Projeto
            </button>
          </li>
        </ul>

        {/* Ícone BsFillPersonPlusFill à direita das abas */}
        {abaAtiva === "usuarios" && (
          <BsFillPersonPlusFill style={{ color: "#2788B7", marginLeft: "10px", fontSize: "1.5em" }} />
        )}
      </div>

      <div className="d-flex justify-content-between align-items-center" style={{ marginTop: "20px" }}>
        {abaAtiva === "usuarios" && (
          <>
            {/* Adicione a Barra de Pesquisa aqui */}
            <BarraDePesquisa />
            {/* Adicione o Select aqui, passando selectedTipoOption como propriedade */}
            <Select
              options={["Opção A", "Opção B", "Opção C"]}
              selectedOption={tipoSelectedOption}
              handleOptionChange={tipoHandleOptionChange}
              optionDefault={"Permissões"}
            />
            {/* Adicione a checkbox "Ativo" aqui, passando ativoChecked como propriedade */}
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="ativoCheckbox"
                checked={ativoChecked}
                onChange={handleAtivoChange}
              />
              <label className="form-check-label" htmlFor="ativoCheckbox">
                Ativo
              </label>
            </div>
            {/* Adicione o botão "Aplicar" aqui, chamando handleAplicar quando clicado */}
            <button
              type="button"
              className="btn btn-primary inter-bold"
              style={{
                backgroundColor: "var(--blue)",
                marginLeft: "10px",
                fontSize: "0.8em",  // Ajuste de tamanho
                padding: "5px 8px",  // Ajuste de padding
              }}
              onClick={handleAplicar}
            >
              Aplicar
            </button>
          </>
        )}
      </div>

      {mostrarUsuarios && abaAtiva === "usuarios" && (
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
                  src="url_da_foto_padrao.jpg"  // Substitua pela URL da foto padrão
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
      )}

{abaAtiva === "membros" && (
  <>
    <div className="d-flex justify-content-between align-items-center mt-3">
      <h2 style={{ color: "var(--blue)", marginRight: "10px" }}>Tipos de vínculo</h2>
      <BotaoOutline
        color="var(--blue)"
        onClick={handleShowNovoVinculoModal}
        style={{
          fontSize: "0.8em",  // Ajuste de tamanho
          padding: "5px 8px",  // Ajuste de padding
        }}
      >
        <BsFillPersonPlusFill style={{ marginRight: "-3px" }} /> Novo vínculo
      </BotaoOutline>
    </div>

    <hr style={{ margin: "10px 0" }} />
    
    {tiposDeVinculo.map((vinculo) => (
      <div key={vinculo} className="d-flex justify-content-between align-items-center mt-2">
        <span>{vinculo}</span>
        <div className="d-flex align-items-center gap-1">
          <Botao
            className="custom-button"
            color="black"
            onClick={() => handleEditarVinculo(vinculo)}
          >
            <BsPencilSquare style={{ marginRight: "1px" }} /> Editar
          </Botao>
          <Botao
            className="custom-button"
            color="black"
            onClick={() => handleRemoverVinculo(vinculo)}
          >
            <BsTrash3 style={{ marginRight: "1px" }} /> Remover
          </Botao>
        </div>
      </div>
    ))}

    <div className="d-flex justify-content-between align-items-center mt-3">
      <h2 style={{ color: "var(--blue)", marginRight: "10px" }}>Tipos de papéis</h2>
      <BotaoOutline
        color="var(--blue)"
        onClick={handleShowNovoPapelModal}
        style={{
          fontSize: "0.8em",  // Ajuste de tamanho
          padding: "5px 8px",  // Ajuste de padding
        }}
      >
        <BsFillPersonPlusFill style={{ marginRight: "-3px" }} /> Novo papel
      </BotaoOutline>
    </div>

    <hr style={{ margin: "10px 0" }} />

    {tiposDePapel.map((papel) => (
      <div key={papel} className="d-flex justify-content-between align-items-center mt-2">
        <span>{papel}</span>
        <div className="d-flex align-items-center gap-1">
          <Botao
            className="custom-button"
            color="black"
            onClick={() => handleEditarPapel(papel)}
          >
            <BsPencilSquare style={{ marginRight: "1px" }} /> Editar
          </Botao>
          <Botao
            className="custom-button"
            color="black"
            onClick={() => handleRemoverPapel(papel)}
          >
            <BsTrash3 style={{ marginRight: "1px" }} /> Remover
          </Botao>
        </div>
      </div>
    ))}
  </>
)}

{abaAtiva === "tipo-de-projeto" && (
  <>
    <div className="d-flex justify-content-between align-items-center mt-3">
      <h2 style={{ color: "var(--blue)", marginRight: "10px" }}>Tipos de projetos</h2>
      <BotaoOutline
        color="var(--blue)"
        onClick={handleShowNovoProjetoModal}
        style={{
          fontSize: "0.8em",  // Ajuste de tamanho
          padding: "5px 8px",  // Ajuste de padding
        }}
      >
        <BsFillPersonPlusFill style={{ marginRight: "-3px" }} /> Novo projeto
      </BotaoOutline>
    </div>

    <hr style={{ margin: "10px 0" }} />

    {tiposDeProjeto.map((projeto) => (
      <div key={projeto} className="d-flex justify-content-between align-items-center mt-2">
        <span>{projeto}</span>
        <div className="d-flex align-items-center gap-1">
          <Botao
            className="custom-button"
            color="black"
            onClick={() => handleEditarProjeto(projeto)}
          >
            <BsPencilSquare style={{ marginRight: "1px" }} /> Editar
          </Botao>
          <Botao
            className="custom-button"
            color="black"
            onClick={() => handleRemoverProjeto(projeto)}
          >
            <BsTrash3 style={{ marginRight: "1px" }} /> Remover
          </Botao>
        </div>
      </div>
    ))}
  </>
)}

      <Modal show={showNovoVinculoModal} onHide={handleCloseVinculoModal}>
        <Modal.Header closeButton>
          <Modal.Title>{vinculoEmEdicao ? "Editar" : "Adicionar"} tipo de vínculo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Tipo de vínculo</Form.Label>
            <Form.Control
              type="text"
              placeholder="Digite o tipo de vínculo"
              value={novoVinculo}
              onChange={(e) => setNovoVinculo(e.target.value)}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <BotaoOutline color="var(--blue)" variant="secondary" onClick={handleCloseVinculoModal}>
            Cancelar
          </BotaoOutline>
          <Button variant="primary" onClick={vinculoEmEdicao ? handleSalvarEdicaoVinculo : handleSalvarVinculo}>
            Salvar
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showEditarVinculoModal} onHide={handleCloseVinculoModal}>
        <Modal.Header closeButton>
          <Modal.Title>Editar tipo de vínculo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Tipo de vínculo</Form.Label>
            <Form.Control
              type="text"
              placeholder="Digite o tipo de vínculo"
              value={novoVinculo}
              onChange={(e) => setNovoVinculo(e.target.value)}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseVinculoModal}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleSalvarEdicaoVinculo}>
            Salvar
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showNovoPapelModal} onHide={handleClosePapelModal}>
        <Modal.Header closeButton>
          <Modal.Title>{papelEmEdicao ? "Editar" : "Adicionar"} tipo de papel</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Tipo de papel</Form.Label>
            <Form.Control
              type="text"
              placeholder="Digite o tipo de papel"
              value={novoPapel}
              onChange={(e) => setNovoPapel(e.target.value)}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <BotaoOutline color="var(--blue)" variant="secondary" onClick={handleClosePapelModal}>
            Cancelar
          </BotaoOutline>
          <Button variant="primary" onClick={papelEmEdicao ? handleSalvarEdicaoPapel : handleSalvarPapel}>
            Salvar
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showEditarPapelModal} onHide={handleClosePapelModal}>
        <Modal.Header closeButton>
          <Modal.Title>Editar tipo de papel</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Tipo de papel</Form.Label>
            <Form.Control
              type="text"
              placeholder="Digite o tipo de papel"
              value={novoPapel}
              onChange={(e) => setNovoPapel(e.target.value)}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClosePapelModal}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleSalvarEdicaoPapel}>
            Salvar
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showNovoProjetoModal} onHide={handleCloseProjetoModal}>
  <Modal.Header closeButton>
    <Modal.Title>{projetoEmEdicao ? "Editar" : "Adicionar"} tipo de projeto</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <Form.Group>
      <Form.Label>Tipo de projeto</Form.Label>
      <Form.Control
        type="text"
        placeholder="Digite o tipo de projeto"
        value={novoProjeto}
        onChange={(e) => setNovoProjeto(e.target.value)}
      />
    </Form.Group>
  </Modal.Body>
  <Modal.Footer>
    <BotaoOutline color="var(--blue)" onClick={handleCloseProjetoModal}>
      Cancelar
    </BotaoOutline>
    <Button variant="primary" onClick={projetoEmEdicao ? handleSalvarEdicaoProjeto : handleSalvarProjeto}>
      Salvar
    </Button>
  </Modal.Footer>
</Modal>

<Modal show={showEditarProjetoModal} onHide={handleCloseProjetoModal}>
  <Modal.Header closeButton>
    <Modal.Title>Editar tipo de projeto</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <Form.Group>
      <Form.Label>Tipo de projeto</Form.Label>
      <Form.Control
        type="text"
        placeholder="Digite o tipo de projeto"
        value={novoProjeto}
        onChange={(e) => setNovoProjeto(e.target.value)}
      />
    </Form.Group>
  </Modal.Body>
  <Modal.Footer>
    <Button variant="secondary" onClick={handleCloseProjetoModal}>
      Cancelar
    </Button>
    <Button variant="primary" onClick={handleSalvarEdicaoProjeto}>
      Salvar
    </Button>
  </Modal.Footer>
</Modal>

    </Container>
  );
}

