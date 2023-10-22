export default function Alert(props) {
  let backgroundColor;
  let textColor;

  switch (props.type) {
    case "aviso":
      backgroundColor = "#f8d7da"; // Cor de fundo para alerta de aviso
      textColor = "#721c24"; // Cor do texto para alerta de aviso
      break;
    case "erro":
      backgroundColor = "#f5c6cb"; // Cor de fundo para alerta de erro
      textColor = "#721c24"; // Cor do texto para alerta de erro
      break;
    case "sucesso":
      backgroundColor = "#d4edda"; // Cor de fundo para alerta de sucesso
      textColor = "#155724"; // Cor do texto para alerta de sucesso
      break;
    default:
      backgroundColor = "#84BCD7"; // Cor de fundo padrão
      textColor = "#126892"; // Cor do texto padrão
      break;
  }

  const style = {
    backgroundColor: backgroundColor,
    borderRadius: "5px",
    padding: "8px",
    margin: "8px 0",
    color: textColor,
    width: "100%",
    display: "block",
  };

  return <span style={style}>{props.children}</span>;
}
