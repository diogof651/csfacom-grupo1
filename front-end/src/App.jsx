import "bootstrap/dist/css/bootstrap.css";
import { Header } from "./components/Header/Header";
import "./global.css";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

export default App;
