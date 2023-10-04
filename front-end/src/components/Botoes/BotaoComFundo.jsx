export function BotaoComFundo(props) {
  const type = props.type ?? "button";
  return (
    <>
      <button
        type={type}
        className="btn inter-bold d-flex align-items-center justify-content-center gap-2"
        style={{
          backgroundColor: `${props.color}`,
          borderColor: `${props.color}`,
          color: "var(--white)",
        }}
      >
        {props.children}
      </button>
    </>
  );
}
