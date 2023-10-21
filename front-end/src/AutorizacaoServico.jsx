import React, { createContext, useContext, useState } from "react";
import Cookies from 'js-cookie';
const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = (hash) => {
    Cookies.set("usuario", hash);
    setIsAuthenticated(true);
  };

  const logout = () => {
    Cookies.remove("usuario");
    setIsAuthenticated(false);
  };

  const value = {
    isAuthenticated,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
