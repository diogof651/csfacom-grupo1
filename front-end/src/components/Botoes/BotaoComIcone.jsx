export function BotaoComIcone(props) {
  return (
    <>
      <button
        type="button"
        className="btn inter-bold d-flex align-items-center justify-content-center gap-2"
        style={{
          backgroundColor: "transparent",
          color: `${props.color}`,
          border: `1px solid ${props.color}`,
        }}
        onClick={props.onClick}
      >
        {props.children}
      </button>
    </>
  );
}