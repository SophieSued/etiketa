import React from "react";
import "../styles/ResultPage.css";

const GraficoComponente = ({ score = null, label = "Análisis de composición:" }) => {
  let s = Number(score);
  if (!Number.isFinite(s)) s = 0;
  if (s <= 1) s = s * 10;
  if (s > 10 && s <= 100) s = s / 10;
  if (s < 0) s = 0;
  if (s > 10) s = 10;

  const tramo = (d, h) => Math.max(0, Math.min(s, h) - d) / (h - d);
  const redPart    = tramo(0, 2.5)   * 25;
  const orangePart = tramo(2.5, 5)   * 25;
  const yellowPart = tramo(5, 7.5)   * 25;
  const greenPart  = tramo(7.5, 10)  * 25;

  const anchoVerde    = `${greenPart}%`;
  const anchoAmarillo = `${yellowPart}%`;
  const anchoNaranja  = `${orangePart}%`;
  const anchoRojo     = `${redPart}%`;

  let estado = "Moderado";
  if (s >= 8) estado = "Seguro";
  else if (s >= 5) estado = "Bajo";
  else if (s >= 3) estado = "Moderado";
  else estado = "Alto";

  return (
    <div className="grafico-componente">
      {/* Header: título izq, puntaje der */}
      <div className="grafico-header">
        <h3>{label}</h3>
        <div className="score-top">
          <span className={`score-value score--${estado.toLowerCase()}`}>
            {s.toFixed(1)}
          </span>
          <span className="score-suffix">/10</span>
        </div>
      </div>

      {/* Barra */}
      <div className="barra-colores">
        <div className="segmento seguro"   style={{ width: anchoVerde }} />
        <div className="segmento bajo"     style={{ width: anchoAmarillo }} />
        <div className="segmento moderado" style={{ width: anchoNaranja }} />
        <div className="segmento alto"     style={{ width: anchoRojo }} />
      </div>

      {/* Leyenda */}
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


