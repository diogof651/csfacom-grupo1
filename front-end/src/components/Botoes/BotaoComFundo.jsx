export function BotaoComFundo(props) {
    return (
      <>
        <button
          type="button"
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
  