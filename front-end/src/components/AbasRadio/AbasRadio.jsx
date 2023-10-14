import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { ButtonGroup, ToggleButton } from "react-bootstrap";
import styles from "./AbasRadio.module.css";

export default function AbasRadio({opcoes}) {
  const [selectedOption, setSelectedOption] = useState("opcao1");

  const handleOptionChange = (value) => {
    setSelectedOption(value);
  };

  return (
    <div>
      <ButtonGroup>
        {opcoes.map((opcao) => (
          <ToggleButton
            key={opcao.value}
            type="radio"
            name="radio-group"
            value={opcao.value}
            variant="dark"
            checked={selectedOption === opcao.value}
            onClick={() => handleOptionChange(opcao.value)}
            className={`${
              selectedOption === opcao.value
                ? ""
                : styles["unselected-radio"]
            }`} /* Aplicar classe "unselected-radio" quando não selecionado */
          >
            {opcao.name}
          </ToggleButton>
        ))}
      </ButtonGroup>
    </div>
  );
}