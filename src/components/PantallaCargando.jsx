import React from "react";
import "../styles/PantallaCargando.css";

const PantallaCargando = ({ mensaje = "Cargando..." }) => {
  return (
    <div className="pantalla-cargando">
      <div className="loader"></div>
      <p>{mensaje}</p>
    </div>
  );
};

export default PantallaCargando;
