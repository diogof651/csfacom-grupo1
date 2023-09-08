import Form from 'react-bootstrap/Form';

export function Input({label, tipo, placeholder, required}) {
  return (
    <>
        <Form.Label
          style={{ fontWeight: "bold", fontSize: "18px" }}
          className="mt-3"
        >
          {label}
        </Form.Label>
        <Form.Control type={tipo} placeholder={placeholder} required={required ? true : false}/>
    </>
  );
}
