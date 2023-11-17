import React from "react";
import Form from "react-bootstrap/Form";

export function Select({
  options,
  selectedOption,
  handleOptionChange,
  optionDefault,
}) {
  const opcaoPadrao = optionDefault ?? "Selecione";
  // function removerAcentos(str) {
  //   return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  // }

  return (
    <Form.Select
      value={selectedOption}
      onChange={handleOptionChange}
      style={{ marginRight: "10px", width: "100%" }}
    >
      <option value="" disabled>
        {opcaoPadrao}
      </option>

      {options.map((option, index) => (
        <option value={option} key={index}>
          {option}
        </option>
      ))}
    </Form.Select>
  );
}
