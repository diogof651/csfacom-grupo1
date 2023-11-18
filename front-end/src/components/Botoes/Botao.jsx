import React from "react";

export function Botao(props) {
  return (
    <button
      type="button"
      className="btn inter-bold d-flex align-items-center justify-content-center gap-2"
      style={{
        backgroundColor: "transparent",
        color: `${props.color}`,
        border: `1px solid ${props.color}`,
        padding: "5px 10px", // Ajuste de tamanho
        height: "30px", // Ajuste de altura
        fontSize: "0.8em", // Ajuste de tamanho de fonte
      }}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
}



