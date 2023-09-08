import React from "react";
import ReactDOM from "react-dom/client";
import { ListagemProjetos } from "./routes/ListagemProjetos/ListagemProjetos.jsx";
import { PaginaProjeto } from "./routes/PaginaProjeto/PaginaProjeto.jsx";
import App from "./App.jsx";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { CadastroUsuario } from "./routes/CadastroUsuario/CadastroUsuario.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    //errorElement: </> -> para colocar uma pagina de erro caso nao encontre a rota
    children: [
      {
        path: "/",
        element: <ListagemProjetos />,
      },
      {
        path: "/projeto/:id",
        element: <PaginaProjeto />,
      },
      {
        path: "/cadastroUsuario",
        element: <CadastroUsuario />,
      },

    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
