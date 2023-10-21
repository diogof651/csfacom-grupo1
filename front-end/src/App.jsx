import "bootstrap/dist/css/bootstrap.css";
import { Outlet } from "react-router-dom";
import { AuthProvider } from "./AutorizacaoServico";
import { Header } from "./components/Header/Header";
import "./global.css";

function App() {
  return (
    <AuthProvider>
      <Header />
      <Outlet />
    </AuthProvider>
  );
}

export default App;
