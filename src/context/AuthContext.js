import { createContext, useState } from "react";
import { setToken as saveToken, getToken, removeToken } from "../auth";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(getToken() || "");

  const login = (newToken) => {
    setToken(newToken);
    saveToken(newToken);
  };

  const logout = () => {
    setToken("");
    removeToken();
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
