import React from "react";

export default function BadgeOutline(props) {
  const style = {
    border: `1px solid ${props.borderColor}`,
    borderRadius: "5px",
    padding: "4px 8px",
    color: props.textColor,
  };

  return <span style={style}>{props.children}</span>;
}
