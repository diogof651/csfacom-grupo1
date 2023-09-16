import Container from "react-bootstrap/Container";
import { BsPencilSquare } from "react-icons/bs";
import Badge from "react-bootstrap/Badge"; // Importe o componente Badge
export function PaginaProjeto() {
  const iconStyle = {
    width: "24px", // Defina o tamanho desejado
    height: "24px", // Defina a altura desejada (opcional)
    marginRight: "10px", // Espaçamento à direita (opcional)
  };
  return (
    <Container
      className="d-flex flex-column"
      style={{ height: "100vh", marginTop: "40px" }}
    >
      <div
        className="d-flex justify-content-between align-items-start"
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
        <button
          type="button"
          className="btn inter-bold"
          style={{
            backgroundColor: "none",
          }}
        >
          <BsPencilSquare style={iconStyle} />
        </button>
      </div>
      <p>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Facere magnam
        assumenda provident nostrum ex, blanditiis qui est voluptatibus
        voluptate quas necessitatibus rerum commodi repudiandae quod totam,
        quisquam ullam? Quam, magnam.
      </p>
    </Container>
  );
}
