import React from "react";
import Form from "react-bootstrap/Form";

export function Input({ label, tipo, placeholder, required, value, onChange }) {
  return (
    <>
      <Form.Label
        style={{ fontWeight: "bold", fontSize: "18px" }}
        className="mt-3"
      >
        {label}
      </Form.Label>
      <Form.Control
        type={tipo}
        placeholder={placeholder}
        required={required}
        value={value}
        onChange={onChange}
      />
    </>
  );
}
