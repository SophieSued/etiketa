import React from "react";
import { Link } from "react-router-dom";
import "../styles/BienvenidoPage.css"; // Opcional si quieres estilos separados

export default function BienvenidoPage() {
  return (
    <div className="bienvenido-page">
      <h1>Bienvenido a la App</h1>
      <div className="bienvenido-buttons">
        <Link to="/login" className="btn btn-login">
          Iniciar Sesión
        </Link>
        <Link to="/registro" className="btn btn-registro">
          Registrarse
        </Link>
      </div>
    </div>
  );
}

