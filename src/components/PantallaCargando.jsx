import React from "react";
import "../styles/PantallaCargando.css";

const PantallaCargando = ({ mensaje = "Cargando..." }) => {
  return (
    <div className="mobile-wrapper">
      <div className="pantalla-cargando">
        <div className="loader"></div>
        <p>{mensaje}</p>
      </div>
    </div>
  );
};

export default PantallaCargando;

