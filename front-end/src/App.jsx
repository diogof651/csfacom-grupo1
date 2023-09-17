import "bootstrap/dist/css/bootstrap.css";
import { Header } from "./components/Header";
import { CadastroProjeto } from "./components/CadastroProjeto";
import "./global.css";

function App() {
  return (
    <div style={{ height: "75%" }}>
      <Header />
      <CadastroProjeto />
    </div>
  );
}

export default App;
