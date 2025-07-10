import React, { useState } from "react";
import "../styles/Formularios.css";

const FormularioLogin = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [contraseña, setContraseña] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const datos = { email, contraseña };

    onLogin?.(datos);
  };

  return (
    <form className="formulario" onSubmit={handleSubmit}>
      <h2>Iniciar sesión</h2>
      <input
        type="email"
        placeholder="Correo electrónico"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={contraseña}
        onChange={(e) => setContraseña(e.target.value)}
        required
      />
      <button type="submit">Entrar</button>
    </form>
  );
};

export default FormularioLogin;
