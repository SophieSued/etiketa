import React from "react";
import "../styles/ResultPage.css";
import BarraFooter from "../components/BarraFooter";

const ResultPage = () => {
  const nombre = "Coca Cola";
  const calificacion = "Mala";
  const recomendacion = "Agua saborizada sin azúcar";

  return (
    <div className="result-page">
        <h1 className="result-title">Resultado del Análisis</h1>
      <div className="imagen-contenedor">
        {/* Imagen acá */}
      </div>

      <div className="producto-info">
        <p><span>Producto:</span> {nombre}</p>
        <p><span>Calificación:</span> {calificacion}</p>
        <p><span>Alternativa:</span> {recomendacion}</p>
      </div>
      
      <BarraFooter /> {}
    </div>
  );
};

export default ResultPage;
