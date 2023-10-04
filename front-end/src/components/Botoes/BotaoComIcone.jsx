export function BotaoComIcone(props) {
  const color = props.color ?? "var(--blue)";

  return (
    <>
      <button
        type="button"
        className="btn inter-bold d-flex align-items-center justify-content-center gap-2"
        style={{
          backgroundColor: "transparent",
          color: `${color}`,
          border: `1px solid ${color}`,
        }}
        onClick={props.onClick}
      >
        {props.children}
      </button>
    </>
  );
}
