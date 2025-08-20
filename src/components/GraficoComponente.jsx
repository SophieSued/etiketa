import React from "react";
import "../styles/ResultPage.css";

const GraficoComponente = () => {
  return (
    <div className="grafico-componente">
      <h3>Análisis de composición:</h3>

      <div className="barra-colores">
        <div className="segmento seguro"></div>
        <div className="segmento bajo"></div>
        <div className="segmento moderado"></div>
        <div className="segmento alto"></div>
      </div>

      <div className="leyenda-colores">
        <span className="etiqueta seguro">Seguro</span>
        <span className="etiqueta bajo">Bajo</span>
        <span className="etiqueta moderado">Moderado</span>
        <span className="etiqueta alto">Alto</span>
      </div>
    </div>
  );
};

export default GraficoComponente;
