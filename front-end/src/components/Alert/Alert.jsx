export default function Alert(props) {
  const backgroundColor = props.backgroundColor ?? "#84BCD7";
  const textColor = props.textColor ?? "#126892";
  const style = {
    backgroundColor: backgroundColor,
    borderRadius: "5px",
    padding: "8px",
    margin: "8px 0",
    color: textColor,
    width: "100%",
    display: "block",
  };

  return <span style={style}>{props.children}</span>;
}
