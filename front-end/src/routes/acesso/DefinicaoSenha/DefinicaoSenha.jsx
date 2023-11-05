import "./../PrimeiroAcesso/PrimeiroAcesso.css";
import { useNavigate, useParams } from "react-router";
import { FormularioDefinirSenha } from "./FormularioDefinirSenha";

export function DefinicaoSenha() {
  const navigate = useNavigate();
  const { codigoUnico } = useParams();

  function cancelar() {
    navigate("/");
  }

  return (
    <div className="container-modal-fundo">
      <div className="container-modal">
        <div className="modal-conteudo">
          <FormularioDefinirSenha
            textoBotao="Próximo"
            navegacao={cancelar}
            codigoUnico={codigoUnico}
          ></FormularioDefinirSenha>
        </div>
      </div>
    </div>
  );
}
