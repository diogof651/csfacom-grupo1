import Badge from "react-bootstrap/Badge"; // Importe o componente Badge
import Container from "react-bootstrap/Container";
import { BsPencilSquare, BsTrash } from "react-icons/bs";
import AbasRadio from "../../components/AbasRadio/AbasRadio.jsx";
import { BotaoComIcone } from "../../components/Botoes/BotaoComIcone";
import { BotaoOutline } from "../../components/Botoes/BotaoOutline";
import Membro from "../../components/Membro/Membro.jsx";

export function PaginaProjeto() {
  const iconStyle = {
    width: "18px", // Defina o tamanho desejado
    height: "18px", // Defina a altura desejada (opcional)
  };

  const opcoes = [
    { name: "Ativo", value: "ativo" },
    { name: "Participações Anteriores", value: "anteriores" },
  ];

  return (
    <Container
      className="d-flex flex-column"
      style={{ height: "100vh", marginTop: "40px" }}
    >
      <div
        className="d-flex justify-content-between align-items-start flex-wrap gap-2"
        style={{
          width: "100%",
          marginBottom: "10px",
        }}
      >
        <div className="d-flex flex-column">
          <p>12/03/2023 - 23/08/2023 </p>
          <h1
            style={{
              fontFamily: "Inter",
              fontWeight: "bold",
              marginRight: "10px",
            }}
          >
            Titulo Projeto
          </h1>
          <div className="d-flex gap-2">
            <Badge bg="dark">Tipo Projeto</Badge>
            <Badge bg="danger">Descontinuado</Badge>
          </div>
        </div>
        <div className="d-flex gap-2">
          <BotaoComIcone color="var(--black)">
            <BsPencilSquare style={iconStyle} /> Editar
          </BotaoComIcone>
          <BotaoComIcone color="var(--black)">
            <BsTrash style={iconStyle} /> Remover
          </BotaoComIcone>
        </div>
      </div>
      <p>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Facere magnam
        assumenda provident nostrum ex, blanditiis qui est voluptatibus
        voluptate quas necessitatibus rerum commodi repudiandae quod totam,
        quisquam ullam? Quam, magnam.
      </p>

      <h1
        style={{
          fontFamily: "Inter",
          fontWeight: "bold",
          marginRight: "10px",
          paddingBottom: "5px",
        }}
      >
        Membros
      </h1>
      <div
        className="d-flex justify-content-between"
        style={{
          width: "100%",
          marginTop: "40px",
          borderBottom: "1px solid #ccc",
        }}
      >
        <AbasRadio opcoes={opcoes}></AbasRadio>
        <BotaoOutline color="var(--blue)"> Novo Membro </BotaoOutline>
      </div>
      <Membro nome="João" papeis={["Designer", "Desenvolvedor Front-end"]} />
      <Membro nome="Maria" papeis={["Desenvolvedor Back-end"]} />
    </Container>
  );
}
