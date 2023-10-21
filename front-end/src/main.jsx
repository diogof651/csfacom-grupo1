import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { CadastroProjeto } from "./routes/projetos/CadastroProjeto/CadastroProjeto.jsx";
import { ListagemProjetos } from "./routes/projetos/ListagemProjetos/ListagemProjetos.jsx";
import { PaginaProjeto } from "./routes/projetos/PaginaProjeto/PaginaProjeto.jsx";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { DefinicaoSenha } from "./routes/acesso/DefinicaoSenha/DefinicaoSenha.jsx";
import { PrimeiroAcesso } from "./routes/acesso/PrimeiroAcesso/PrimeiroAcesso.jsx";
import { CadastroNoticia } from "./routes/noticias/CadastroNoticia/CadastroNoticia.jsx";
import { ListagemNoticias } from "./routes/noticias/ListagemNoticias/ListagemNoticias.jsx";
import { PaginaNoticia } from "./routes/noticias/PaginaNoticia/PaginaNoticia.jsx";
import { CadastroMembro } from "./routes/projetos/Membro/CadastroMembro.jsx";
import { CadastroUsuario } from "./routes/Usuario/CadastroUsuario/CadastroUsuario.jsx";
import { Perfil } from "./routes/Usuario/Perfil/Perfil.jsx";
import Entrar from "./routes/login/entrar.jsx";


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
        path: "/primeiroAcesso",
        element: <PrimeiroAcesso />,
      },
      {
        path: "/definirSenha",
        element: <DefinicaoSenha />,
      },
      {
        path: "/esqueciMinhaSenha",
        element: <PrimeiroAcesso />,
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
        path: "/cadastroMembro/projeto/:idProjeto",
        element: <CadastroMembro />,
      },
      {
        path: "/editarMembro/projeto/:idProjeto/membro/:idMembro",
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
        path: "/noticias",
        element: <ListagemNoticias />,
      },
      {
        path: "/cadastroNoticia",
        element: <CadastroNoticia />,
      },
      {
        path: "/editarNoticia/:id",
        element: <CadastroNoticia />,
      },
      {
        path: "/noticia/:id",
        element: <PaginaNoticia />,
      },
      {
        path: "/entrar",
        element: <Entrar />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
