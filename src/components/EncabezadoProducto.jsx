import React from "react";

const EncabezadoProducto = ({ nombre, marca }) => {
  return (
    <div className="encabezado-producto">
      <h2>{nombre}</h2>
      <p>{marca}</p>
    </div>
  );
};

export default EncabezadoProducto;
