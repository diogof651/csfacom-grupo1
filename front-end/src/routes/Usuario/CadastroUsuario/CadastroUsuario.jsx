import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import { useNavigate, useParams } from "react-router";
import { useAuth } from "../../../AutorizacaoServico";
import Alert from "../../../components/Alert/Alert";
import { BotaoComFundo } from "../../../components/Botoes/BotaoComFundo";
import { BotaoOutline } from "../../../components/Botoes/BotaoOutline";
import { Input } from "../../../components/Input/Input";

export function CadastroUsuario() {
  const navigate = useNavigate();
  const { idUsuario } = useParams();

  
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [ativo, setAtivo] = useState(true);
  const [permissoes, setPermissoes] = useState([]);
  const [permissoesSelecionadas, setPermissoesSelecionadas] = useState([]);
  const [mensagemErro, setMensagemErro] = useState("");
  
  const [temPermissao, setTemPermissao] = useState(false);
  const { hashUsuarioLogado } = useAuth();

  useEffect(() => {
    function obterPermissoesUsuario() {
      fetch("http://localhost:8080/api/v1/usuarios/obterPermissoes", {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          usuarioLogado: hashUsuarioLogado(),
        },
      })
        .then((resposta) => resposta.json())
        .then((data) => {
          const permissoes = data;
          setTemPermissao(
            permissoes.some((permissao) => permissao.nome === "ADMIN")
          );
        })
        .catch((erro) => console.log(erro));
    }

    obterPermissoesUsuario();
  }, []);

  useEffect(() => {
    if (permissoes.length === 0) {
      obterPermissoes();
    }
  }, [permissoes]);

  useEffect(() => {
    if (idUsuario) {
      fetch(`http://localhost:8080/api/v1/usuarios/${idUsuario}`)
        .then((resposta) => resposta.json())
        .then((data) => {
          setNome(data.nome);
          setEmail(data.email);
          setAtivo(data.ativo);
          setPermissoesSelecionadas(data.permissoes);
        })
        .catch((erro) => console.log(erro));
    }
  }, [idUsuario]);

  const onSubmit = (e) => {
    e.preventDefault();

    const data = {
      nome: nome,
      email: email,
      permissoes: permissoesSelecionadas,
      ativo: ativo,
    };

    if (idUsuario) {
      fetch(
        `http://localhost:8080/api/v1/usuarios/${idUsuario}/gerenciarUsuario`,
        {
          method: "PUT",
          headers: {
            "Content-type": "application/json",
            usuarioLogado: hashUsuarioLogado(),
          },
          body: JSON.stringify(data),
        }
      )
        .then((resposta) => navigate("/gerenciar"))
        .catch((erro) => console.log(erro));
    } else {
      fetch("http://localhost:8080/api/v1/usuarios", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          usuarioLogado: hashUsuarioLogado(),
        },
        body: JSON.stringify(data),
      })
        .then((resposta) => {
          resposta.json().then((dados) => {
            if (
              dados.resposta ===
              "Usuário sem permissão para criação de outro usuário."
            ) {
              setMensagemErro(dados.resposta);
            } else {
              navigate("/gerenciar");
            }
          });
        })
        .catch((erro) => console.log(erro));
    }
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
        setPermissoes(data);
      })
      .catch((erro) => console.log(erro));
  }

  const toggleSelecionado = (permissao) => {
    if (
      (permissao.nome == "SOMENTELEITURA" || permissao.nome == "ADMIN") &&
      permissoesSelecionadas.length > 0
    ) {
      setPermissoesSelecionadas((permissaoSelecionada) =>
        permissaoSelecionada.includes(permissao)
          ? permissaoSelecionada.filter((i) => i !== permissao)
          : [permissao]
      );
    } else {
      setPermissoesSelecionadas((listaSelecionada) =>
        listaSelecionada.includes(permissao)
          ? listaSelecionada.filter((i) => i !== permissao)
          : [...listaSelecionada, permissao]
      );
    }
  };

  const isDisabled = (permissao) => {
    let administradorOuSomenteLeitura = permissoesSelecionadas.filter(
      (permissao) =>
        permissao.nome == "SOMENTELEITURA" || permissao.nome == "ADMIN"
    );

    if (administradorOuSomenteLeitura.length > 0) {
      return administradorOuSomenteLeitura.some(
        (permissaoSelecionada) => permissaoSelecionada.nome !== permissao.nome
      );
    }
  };

  function cancelar() {
    navigate("/");
  }

  return (
    <>
      {temPermissao ? (
        <>
          <Container
            className="d-flex flex-column"
            style={{ width: "50vw", marginTop: "40px" }}
          >
            {mensagemErro && <Alert type="erro">{mensagemErro}</Alert>}
            <h1
              style={{
                borderBottom: "1px solid #ccc",
                marginBottom: "10px",
                fontWeight: "bold",
                paddingBottom: "5px",
              }}
            >
              Dados Pessoais
            </h1>
            <Form
              className={`d-flex justify-content-center flex-column form-container w-100`}
              onSubmit={onSubmit}
            >
              <Input
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                label={"Nome"}
                required={true}
                placeholder={"Digite seu nome"}
                tipo={"text"}
              ></Input>
              <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                label={"Email"}
                required={true}
                placeholder={"Digite seu email"}
                tipo={"email"}
              ></Input>
              <Form.Check
                className="mt-3"
                type="checkbox"
                id="ativoCheckbox"
                checked={ativo}
                onChange={(e) => setAtivo(e.target.value)}
                label="Ativo"
              />
              <h1
                style={{
                  borderBottom: "1px solid #ccc",
                  marginBottom: "10px",
                  fontWeight: "bold",
                  paddingBottom: "5px",
                }}
              >
                Permissões
              </h1>
              <div className="row">
                {permissoes.map((permissao, index) => (
                  <Form.Check
                    key={index}
                    className="checkbox-container"
                    type="checkbox"
                    id={`checkbox-${index}`}
                    label={permissao.nome}
                    checked={permissoesSelecionadas.some(
                      (permissaoSelecionada) =>
                        permissaoSelecionada.nome === permissao.nome
                    )}
                    onChange={() => toggleSelecionado(permissao)}
                    disabled={isDisabled(permissao)}
                  />
                ))}
              </div>
              <div className="d-flex justify-content-end gap-2 mt-4">
                <BotaoOutline color="var(--blue)" onClick={cancelar}>
                  Cancelar
                </BotaoOutline>
                <BotaoComFundo type="submit" color="var(--blue)">
                  Cadastrar
                </BotaoComFundo>
              </div>
            </Form>
          </Container>
        </>
      ) : (
        <h1>Você não tem permissão para acessar esta página.</h1>
      )}
    </>
  );
}
