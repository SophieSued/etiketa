import React from "react";

const BotonAnalisis = ({ activo, onClick }) => {
  return (
    <button
      className={`boton-analisis ${activo ? "activo" : ""}`}
      onClick={onClick}
    >
      Análisis
    </button>
  );
};

export default BotonAnalisis;

