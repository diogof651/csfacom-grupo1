import React, { createContext, useContext, useState } from "react";
import { CookiesProvider, useCookies } from "react-cookie";
const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(["usuario"]);

  const usuarioLogado = () => {
    return !!cookies.usuario;
  };

  const hashUsuarioLogado = () => {
    return cookies.usuario;
  };

  const login = (hash) => {
    setCookie("usuario", hash);
    setIsAuthenticated(true);
  };

  const logout = () => {
    removeCookie("usuario");
    setIsAuthenticated(false);
  };

  const value = {
    usuarioLogado,
    isAuthenticated,
    hashUsuarioLogado,
    login,
    logout,
  };

  return (
    <CookiesProvider>
      <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    </CookiesProvider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
