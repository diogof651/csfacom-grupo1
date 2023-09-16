import React from "react";
import ReactDOM from "react-dom/client";
import { ListagemProjetos } from "./routes/ListagemProjetos/ListagemProjetos.jsx";
import { PaginaProjeto } from "./routes/PaginaProjeto/PaginaProjeto.jsx";
import App from "./App.jsx";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <ListagemProjetos />,
        //errorElement: </> -> para colocar uma pagina de erro caso nao encontre a rota
      },
      {
        path: "/projeto/:id",
        element: <PaginaProjeto />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
