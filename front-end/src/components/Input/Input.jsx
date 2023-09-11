import Form from "react-bootstrap/Form";

export function Input({ label, tipo, placeholder, required, disabled }) {
  return (
    <div className="w-100">
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
        disabled={disabled}
      />
    </div>
  );
}
