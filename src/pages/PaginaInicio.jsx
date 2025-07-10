import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Formularios.css";

const PaginaAcceso = () => {
  const navigate = useNavigate();

  return (
    <div className="mobile-wrapper">
      <div className="pagina-acceso">
        <h2>¡Bienvenida!</h2>
        <button className="boton-acceso" onClick={() => navigate("/login")}>
          Iniciar sesión
        </button>
        <button className="boton-acceso" onClick={() => navigate("/registro")}>
          Registrarse
        </button>
      </div>
    </div>
  );
};

export default PaginaAcceso;
