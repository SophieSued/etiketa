import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext"; 
import "../styles/Formularios.css";

export default function FormularioLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");      
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const API_BASE = (import.meta.env.VITE_API_BASE ?? "https://etiketa-backend.onrender.com").replace(/\/+$/, "");
  const LOGIN_URL = import.meta.env.VITE_AUTH_LOGIN_URL || `${API_BASE}/usuarios/login`;

  async function parseMaybeJson(res) {
    const ct = res.headers.get("content-type") || "";
    if (ct.includes("application/json")) {
      try { return await res.json(); } catch { return { raw: "(JSON inválido)" }; }
    }
    return { raw: await res.text() };
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");
    setLoading(true);

    try {
      setMsg(`→ POST ${LOGIN_URL}`);
      const res = await fetch(LOGIN_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await parseMaybeJson(res);
      setMsg((m) => m + `\n← Status: ${res.status}\nRespuesta: ${JSON.stringify(data).slice(0,200)}`);

      if (!res.ok) {
        throw new Error(data?.message || data?.error || data?.raw || `HTTP ${res.status}`);
      }

      const token = data?.token || data?.accessToken;
      if (!token) throw new Error("El servidor no devolvió token.");

      
      login({ token, email });

      setLoading(false);
      navigate("/inicio");
    } catch (err) {
      setLoading(false);
      setMsg((m) => m + `\nError: ${err.message || "Fallo desconocido"}`);
    }
  };

  return (
    <div className="auth-page auth-page--login">
      {

      }
      <div className="logo-container">
        <img src="/Logo chico (1).png" alt="Etiketa" className="logo" />
      </div>

      {

      }
      <form className="formulario formulario--login" onSubmit={handleSubmit}>
        <h2>Bienvenido!</h2>
        <p className="sub">
          Ingresa tus datos para continuar 
        </p>

        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="email"
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoComplete="current-password"
        />

        {msg && (
          <pre style={{ background:'#111', color:'#0f0', padding:8, borderRadius:8, whiteSpace:'pre-wrap' }}>
            {msg}
          </pre>
        )}

        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? "Entrando..." : "Iniciar sesión"}
        </button>
      </form>

      {

      }
      <p className="login-externo">
        No tenes una cuenta aún?{" "}
        <a href="/registro">Presiona acá para Registrarte</a>
      </p>
    </div>
  );
}
