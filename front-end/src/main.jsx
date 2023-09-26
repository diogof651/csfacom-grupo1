import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { ListagemProjetos } from "./routes/projetos/ListagemProjetos/ListagemProjetos.jsx";
import { PaginaProjeto } from "./routes/projetos/PaginaProjeto/PaginaProjeto.jsx";
import { CadastroProjeto } from "./routes/projetos/CadastroProjeto/CadastroProjeto.jsx";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { CadastroUsuario } from "./routes/Usuario/CadastroUsuario/CadastroUsuario.jsx";
import { Perfil } from "./routes/Usuario/Perfil/Perfil.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    //errorElement: </> -> para colocar uma pagina de erro caso nao encontre a rota
    children: [
      {
        path: "/projetos",
        element: <ListagemProjetos />,
      },
      {
        path: "/",
        element: <ListagemProjetos />,
      },
      {
        path: "/projetos",
        element: <ListagemProjetos />,
      },
      {
        path: "/cadastroProjeto",
        element: <CadastroProjeto />,
      },
      {
        path: "/editarProjeto/:id",
        element: <CadastroProjeto />,
      },
      {
        path: "/projeto/:id",
        element: <PaginaProjeto />,
      },
      {
        path: "/cadastroUsuario",
        element: <CadastroUsuario />,
      },
      {
        path: "/perfil",
        element: <Perfil />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
