import React from "react";
import "../styles/ResultPage.css";

const EncabezadoProducto = ({ nombre, marca, imagen }) => {

  return (
    <div className="encabezado-producto">
      <img src={imagen} alt={nombre} className="imagen-producto" />
      <h2>{nombre}</h2>
      <p>{marca}</p>
    </div>
  );
};

export default EncabezadoProducto;


