import React, { useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import { BsFillCameraFill } from "react-icons/bs";

export function FotoPerfil() {
  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    // Simule um clique no input do tipo file quando o botão for clicado
    fileInputRef.current.click();
  };

  const handleFileInputChange = (e) => {
    // Aqui você pode lidar com o arquivo selecionado
    const selectedFile = e.target.files[0];
    console.log("Arquivo selecionado:", selectedFile);
  };

  return (
    <>
      <div
        style={{
          width: "120px",
          height: "120px",
          borderRadius: "50%",
          backgroundColor: "#ccc", // Cor de fundo do círculo
          position: "relative", // Para posicionar o botão sobre o círculo
        }}
      >
        <Button
          style={{
            backgroundColor: "var(--blue)",
            width: "40px",
            height: "40px",
            borderRadius: "50%", // Torna o botão redondo
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "absolute", // Posiciona o botão sobre o círculo
            bottom: "5px", // Ajuste a posição vertical conforme necessário
            right: "5px", // Ajuste a posição horizontal conforme necessário
          }}
          onClick={handleButtonClick}
        >
          <BsFillCameraFill
            style={{
              width: "20px", // Tamanho do ícone
              height: "20px", // Tamanho do ícone
              color: "#fff", // Cor do ícone
            }}
          />
        </Button>
      </div>
      <input
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        ref={fileInputRef}
        onChange={handleFileInputChange}
      />
    </>
  );
}
