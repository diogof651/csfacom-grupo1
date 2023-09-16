import React from "react";
import Form from "react-bootstrap/Form";
import { BsSearch } from "react-icons/bs";

export function BarraDePesquisa(props) {
  return (
    <div className="position-relative me-2 w-100">
      <BsSearch
        className="position-absolute top-50 start-0 translate-middle-y"
        style={{
          fontSize: "1.2em",
          height: "1em",
          width: "2em",
          left: "5px",
        }}
      />
      <Form.Control
        type="text"
        style={{ width: "100%", paddingLeft: "35px" }}
        onChange={props.handleSearchChange}
        value={props.searchText}
      />
    </div>
  );
}
