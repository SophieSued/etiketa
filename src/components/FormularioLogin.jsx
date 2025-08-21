import React, { useState } from "react";
import "../styles/Formularios.css";

const FormularioLogin = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin?.({ email, password });
  };

  return (
    <div className="auth-page auth-page--login">
      <form className="formulario formulario--registro" onSubmit={handleSubmit}>
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
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit" className="submit-btn">Entrar</button>
      </form>
    </div>
  );
};

export default FormularioLogin;


