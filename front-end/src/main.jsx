import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { CadastroProjeto } from "./routes/projetos/CadastroProjeto/CadastroProjeto.jsx";
import { ListagemProjetos } from "./routes/projetos/ListagemProjetos/ListagemProjetos.jsx";
import { PaginaProjeto } from "./routes/projetos/PaginaProjeto/PaginaProjeto.jsx";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { CadastroNoticia } from "./routes/noticias/CadastroNoticia/CadastroNoticia.jsx";
import { ListagemNoticias } from "./routes/noticias/ListagemNoticias/ListagemNoticias.jsx";
import { PaginaNoticia } from "./routes/noticias/PaginaNoticia/PaginaNoticia.jsx";
import { CadastroMembro } from "./routes/Projeto/CadastroMembro.jsx";
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
        path: "/cadastroMembro",
        element: <CadastroMembro />,
      },
      {
        path: "/cadastroUsuario",
        element: <CadastroUsuario />,
      },
      {
        path: "/perfil",
        element: <Perfil />,
      },
      {
        path: "/cadastroNoticia",
        element: <CadastroNoticia />,
      },
      {
        path: "/noticias",
        element: <ListagemNoticias />,
      },
      {
        path: "/editarNoticia/:id",
        element: <CadastroNoticia />,
      },
      {
        path: "/noticia/:id",
        element: <PaginaNoticia />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
