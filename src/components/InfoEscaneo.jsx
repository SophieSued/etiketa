import React from "react";
import "../styles/InfoEscaneo.css";

const InfoEscaneo = () => {
  return (
    <div className="info-limite">
      <div className="bloque-info">
        <h3>Consejos para escanear</h3>
        <ul>
          <li>Mantené el código de barras dentro del marco</li>
          <li>Buena iluminación mejora el resultado</li>
          <li>Mantené el teléfono firme</li>
        </ul>
      </div>

      <div className="bloque-info">
        <h3>Estándares de clasificación</h3>
        <p>
          Nuestro sistema utiliza estándares reconocidos para identificar productos
          y categorías.
        </p>
      </div>

      <div className="bloque-info">
        <label htmlFor="busqueda" className="busqueda-label">
          ¿No encontrás el código?
        </label>
        <input
          type="text"
          id="busqueda"
          className="busqueda-input"
          placeholder="Buscar por nombre o descripción"
        />
      </div>
    </div>
  );
};

export default InfoEscaneo;

