import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  const [email, setEmail] = useState(null);

  useEffect(() => {
    const t = localStorage.getItem("accessToken") || localStorage.getItem("token");
    const e = localStorage.getItem("usuarioEmail");
    if (t) setToken(t);
    if (e) setEmail(e);
  }, []);

  const login = ({ token, email }) => {
    if (token) {
      localStorage.setItem("accessToken", token);
      localStorage.setItem("token", token);
    }
    if (email) localStorage.setItem("usuarioEmail", email);
    setToken(token);
    setEmail(email);
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("token");
    localStorage.removeItem("usuarioEmail");
    setToken(null);
    setEmail(null);
  };

  const value = useMemo(() => ({ token, email, isAuth: !!token, login, logout }), [token, email]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
