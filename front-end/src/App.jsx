import { ListagemProjetos } from "./components/ListagemProjetos/ListagemProjetos";
import { Header } from "./components/Header/Header";
import "./global.css";
import "bootstrap/dist/css/bootstrap.css";

function App() {
  return (
    <>
      <Header />
      <ListagemProjetos />
    </>
  );
}

export default App;
