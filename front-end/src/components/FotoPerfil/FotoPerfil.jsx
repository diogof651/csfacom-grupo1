import React, { useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import { BsFillCameraFill } from "react-icons/bs";

export function FotoPerfil({ onImageSelect }) {
  const fileInputRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileInputChange = (e) => {
    const selectedFile = e.target.files[0];
    setSelectedImage(URL.createObjectURL(selectedFile));
    onImageSelect(URL.createObjectURL(selectedFile));
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
            src={selectedImage}
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
