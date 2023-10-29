import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { FotoPerfil } from "../../../components/FotoPerfil/FotoPerfil";
import { Input } from "../../../components/Input/Input";
import { BotaoComFundo } from "../../../components/Botoes/BotaoComFundo";
import { BotaoOutline } from "../../../components/Botoes/BotaoOutline";
import Alert from "../../../components/Alert/Alert";

export function Perfil() {
  const [showModal, setShowModal] = useState(false);

  const [codigoUnico, setCodigoUnico] = useState("");
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [github, setGithub] = useState("");
  const [foto, setFoto] = useState("");

  const [trocarSenhaMensagemErro, setTrocarSenhaMensagemErro] = useState("");
  const [senhaAtual, setSenhaAtual] = useState("");
  const [novaSenha, setNovaSenha] = useState("");
  const [confirmarNovaSenha, setConfirmarNovaSenha] = useState("");

  const handleImageSelect = (selectedImage) => {
    setFoto(selectedImage);
  };

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const cancelar = () => {
    // Implemente a ação desejada quando o botão "Cancelar" for clicado
  };

  const salvarAlteracoes = () => {
    // Implemente a lógica para salvar as alterações no perfil
  };

  const trocarSenha = () => {
    // Implemente a lógica para trocar a senha aqui

    // Adicione a lógica para verificar a validade da senha e mostrar a mensagem de erro
    if (!(isSenhaValida(novaSenha) && novaSenha === confirmarNovaSenha)) {
      setTrocarSenhaMensagemErro("Senha fora do padrão estabelecido");
      return;
    }

    // Resto da lógica para a troca de senha
  };

  function isSenhaValida(senha) {
    // Verifica se a senha possui pelo menos 10 caracteres
    if (senha.length < 10) return false;

    // Verifica se a senha contém pelo menos 1 letra maiúscula
    if (!/[A-Z]/.test(senha)) return false;

    // Verifica se a senha contém pelo menos 1 letra minúscula
    if (!/[a-z]/.test(senha)) return false;

    // Verifica se a senha contém pelo menos 1 caractere numérico
    if (!/[0-9]/.test(senha)) return false;

    // Verifica se a senha contém pelo menos 1 caractere especial
    if (!/[@!#$%*]/.test(senha)) return false;

    return true;
  }

  return (
    <>
      <Container className="d-flex flex-column" style={{ width: "50vw", marginTop: "40px" }}>
        <h1 style={{ borderBottom: "1px solid #ccc", marginBottom: "10px", fontWeight: "bold", paddingBottom: "5px" }}>
          Perfil
        </h1>
        <div className="mx-auto mt-2 mb-2">
          <FotoPerfil onImageSelect={handleImageSelect} />
        </div>

        <div className="d-flex justify-content-between align-items-center mt-2">
          <div className="ml-auto">
            <Button variant="outline-secondary" onClick={handleShowModal}>
              Trocar Senha
            </Button>
          </div>
        </div>

        <Input value={codigoUnico} onChange={(e) => setCodigoUnico(e.target.value)} label={"Codigo Unico"} required={true} disabled={true} tipo={"text"}></Input>
        <Input value={nome} onChange={(e) => setNome(e.target.value)} label={"Nome"} required={true} placeholder={"Digite seu nome"} tipo={"text"}></Input>
        <Input value={email} onChange={(e) => setEmail(e.target.value)} label={"Email"} required={true} placeholder={"Digite seu email"} tipo={"email"}></Input>
        <Input value={linkedin} onChange={(e) => setLinkedin(e.target.value)} label={"Linkedin"} placeholder={"Digite seu linkedin"} tipo={"text"}></Input>
        <Input value={github} onChange={(e) => setGithub(e.target.value)} label={"GitHub"} placeholder={"Digite seu github"} tipo={"text"}></Input>

        <div className="d-flex justify-content-end gap-2 mt-4">
          <BotaoOutline color="var(--blue)" onClick={cancelar}>
            Cancelar
          </BotaoOutline>
          <BotaoComFundo color="var(--blue)" onClick={salvarAlteracoes}>
            Salvar Alterações
          </BotaoComFundo>
        </div>

        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Trocar Senha</Modal.Title>
          </Modal.Header>
          
          <Modal.Body>
          <Alert>
              A senha deve possuir 10 caracteres, contendo:
              <br />- 1 Carácter de letra maiúscula
              <br />- 1 Carácter de letra minúscula
              <br />- 1 Carácter numérico
              <br />- 1 Carácter especial
            </Alert>
            <Input label={"Senha Atual"} tipo="password" />
            <Input label={"Nova Senha"} tipo="password" />
            <Input label={"Confirmar Nova Senha"} tipo="password" />

            {trocarSenhaMensagemErro && <Alert type="erro">{trocarSenhaMensagemErro}</Alert>}

          </Modal.Body>
          <Modal.Footer>
            <BotaoOutline color="var(--blue)" onClick={handleCloseModal}>
              Fechar
            </BotaoOutline>
            <BotaoComFundo type="submit" color="var(--blue)" onClick={trocarSenha}>
              Trocar Senha
            </BotaoComFundo>
          </Modal.Footer>
        </Modal>
      </Container>
    </>
  );
}
