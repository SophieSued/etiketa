import React, { useState } from "react";
import "../styles/Formularios.css";

const FormularioRegistro = ({ onRegistro }) => {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [contraseña, setContraseña] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const datos = { nombre, email, contraseña };

    onRegistro?.(datos);
  };

  return (
    <form className="formulario" onSubmit={handleSubmit}>
      <h2>Registrate</h2>
      <input
        type="text"
        placeholder="Nombre"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        required
      />
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
      <button type="submit">Crear cuenta</button>
    </form>
  );
};

export default FormularioRegistro;
