// src/components/FormularioRegistro.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import StepDots from "../components/StepDots";
import "../styles/Formularios.css";

const FormularioRegistro = ({ onRegistro }) => {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (password !== password2) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    const datos = { nombre, apellido, email, password };
    onRegistro?.(datos);         // << mantiene tu “conexión” como estaba
    navigate("/filtros");        // << al continuar, va a FiltrosPage
  };

  return (
    <div className="auth-page">
      {/* Logo arriba */}
      <div className="logo-container">
        {/* Ajustá la ruta del src según tu archivo (ej: "/Logo chico (1).png" o "/logo-chico.png") */}
        <img src="/Logo chico (1).png" alt="Logo Etiketa" className="logo" />
      </div>

      {/* Bolitas de pasos */}
      <StepDots />

      {/* Formulario */}
      <form className="formulario formulario--registro" onSubmit={handleSubmit}>
        <h2>Bienvenido!!</h2>
        <p style={{ margin: 0, marginBottom: 4, color: "var(--c-muted)" }}>
          Ingresa tus datos para crear tu cuenta en <strong>Etiketa</strong>
        </p>

        {/* Nombre / Apellido */}
        <div className="split-2">
          <input
            type="text"
            placeholder="Nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
            aria-label="Nombre"
          />
          <input
            type="text"
            placeholder="Apellido"
            value={apellido}
            onChange={(e) => setApellido(e.target.value)}
            required
            aria-label="Apellido"
          />
        </div>

        {/* Email */}
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          aria-label="Correo electrónico"
        />

        {/* Contraseñas */}
        <input
          type="password"
          placeholder="Crear contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          aria-label="Crear contraseña"
        />
        <input
          type="password"
          placeholder="Ingresar la contraseña nuevamente"
          value={password2}
          onChange={(e) => setPassword2(e.target.value)}
          required
          aria-label="Confirmar contraseña"
        />

        {/* Error inline */}
        {error && (
          <small style={{ color: "#e5484d", marginTop: -4 }}>{error}</small>
        )}

        {/* CTA */}
        <button type="submit">Continuar</button>

        {/* Link a login */}
        <p style={{ margin: 8, textAlign: "center", color: "var(--c-muted)" }}>
          Ya tenes una cuenta? Presiona acá para {" "}
          <a href="/login" style={{ color: "var(--c-primary)", fontWeight: 600 }}>
            Iniciar sesión
          </a>
        </p>
      </form>
    </div>
  );
};

export default FormularioRegistro;
