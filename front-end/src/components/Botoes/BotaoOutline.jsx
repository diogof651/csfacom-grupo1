export function BotaoOutline(props) {
  return (
    <>
      <button
        type="button"
        className="btn inter-bold d-flex align-items-center justify-content-center gap-2"
        style={{
          backgroundColor: "transparent",
          color: `${props.color}`,
          border: `1px solid ${props.color}`,
          padding:"5px",
          height: "40px"
        }}
      >
        {props.children}
      </button>
    </>
  );
}
