import "bootstrap/dist/css/bootstrap.css";
import { Outlet } from "react-router-dom";
import { AuthProvider } from "./AutorizacaoServico";
import { Header } from "./components/Header/Header";
import "./global.css";

function App() {
  const mostrarNavLinkGerenciar = window.location.pathname.includes("/gerenciar");

  return (
    <AuthProvider>
      <Header mostrarNavLinkGerenciar={mostrarNavLinkGerenciar} />
      <Outlet />
    </AuthProvider>
  );
}

export default App;