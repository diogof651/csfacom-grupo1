import React from "react";
import Form from "react-bootstrap/Form";

export function Select({ options, selectedOption, handleOptionChange }) {
  function removerAcentos(str) {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }

  return (
    <Form.Select
      value={removerAcentos(selectedOption)}
      onChange={handleOptionChange}
      style={{ width: "150px", marginRight: "10px", width: "100%" }}
    >
      {options.map((option, index) => (
        <option value={removerAcentos(option)} key={index}>
          {option}
        </option>
      ))}
    </Form.Select>
  );
}