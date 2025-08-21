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
    onRegistro?.(datos);          
    navigate("/filtros");
  };

  return (
    <div className="auth-page">
      {}
      <div className="logo-container">
        <img src="/Logo chico (1).png" alt="Logo Etiketa" className="logo" />
      </div>
      <StepDots />

      {}
      <form id="registroForm" className="formulario formulario--registro" onSubmit={handleSubmit}>
        <h2>Bienvenido!!</h2>
        <p className="sub">
          Ingresa tus datos para crear tu cuenta en <strong>Etiketa</strong>
        </p>

        {}
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

        {}
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          aria-label="Correo electrónico"
        />

        {}
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

        {error && <small className="error">{error}</small>}
      </form>

      {}
      <div className="acciones-externas">
        <button form="registroForm" type="submit" className="cta-externa">
          Continuar
        </button>

        <p className="login-externo">
          Ya tenes una cuenta? Presiona acá para hacer{" "}
          <a href="/login">Iniciar sesión</a>
        </p>
      </div>
    </div>
  );
};

export default FormularioRegistro;
