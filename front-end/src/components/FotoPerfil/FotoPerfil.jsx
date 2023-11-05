import { React, useEffect, useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import { BsFillCameraFill } from "react-icons/bs";

export function FotoPerfil({ onImageSelect, foto }) {
  const fileInputRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    setSelectedImage(foto);
  }, [foto]);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  function converterParaBase64(selectedFile, callback) {
    const reader = new FileReader();
    reader.onload = function (event) {
      const base64String = event.target.result.split(",")[1];
      callback(base64String);
    };
    reader.readAsDataURL(selectedFile);
  }

  const handleFileInputChange = (e) => {
    const selectedFile = e.target.files[0];
    const fotoUrl = URL.createObjectURL(selectedFile);

    if (selectedFile) {
      if (
        selectedFile.type === "image/png" ||
        selectedFile.type === "image/jpeg"
      ) {
        const processFile = (file) => {
          converterParaBase64(file, (conteudoBase64) => {
            setSelectedImage(conteudoBase64);
            onImageSelect(conteudoBase64);
          });
        };

        processFile(selectedFile);
      } else {
        alert("Por favor, selecione um arquivo PNG ou JPEG válido.");
      }
    }
  };

  return (
    <>
      <div
        style={{
          width: "120px",
          height: "120px",
          borderRadius: "50%",
          backgroundColor: "#ccc",
          position: "relative",
        }}
      >
        {selectedImage && (
          <img
            src={
              selectedImage != null && selectedImage
                ? `data:image/jpeg;base64,${selectedImage}`
                : ""
            }
            alt="Foto de perfil"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              borderRadius: "50%",
            }}
          />
        )}

        <Button
          style={{
            backgroundColor: "var(--blue)",
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "absolute",
            bottom: "5px",
            right: "5px",
            opacity: selectedImage ? 0.5 : 1,
          }}
          onClick={handleButtonClick}
        >
          <BsFillCameraFill
            style={{
              width: "20px",
              height: "20px",
              color: "#fff",
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
