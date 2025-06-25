import React from "react";

const BotonAlternativa = ({ activo, onClick }) => {
  return (
    <button
      className={`boton-analisis ${activo ? "activo" : ""}`}
      onClick={onClick}
    >
      Alternativos
    </button>
  );
};

export default BotonAlternativa;
