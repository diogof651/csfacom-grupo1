import React from "react";
import Form from "react-bootstrap/Form";

export function Select({ options, selectedOption, handleOptionChange }) {
  return (
    <Form.Select
      value={selectedOption}
      onChange={handleOptionChange}
      style={{ width: "150px", marginRight: "10px", width: "100%" }}
    >
      {options.map((option, index) => (
        <option value="{option}" key={index}>
          {option}
        </option>
      ))}
    </Form.Select>
  );
}