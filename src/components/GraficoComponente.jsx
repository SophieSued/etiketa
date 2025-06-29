import React from "react";

const GraficoComponente = () => {
  return (
    <div className="grafico-componente">
  <h3>Análisis componentes</h3>
  <div className="donut-chart">
    <svg viewBox="0 0 36 36">
      <circle className="segmento uno" cx="18" cy="18" r="15.9155" />
      <circle className="segmento dos" cx="18" cy="18" r="15.9155" />
      <circle className="segmento tres" cx="18" cy="18" r="15.9155" />
      <circle className="segmento cuatro" cx="18" cy="18" r="15.9155" />
      <text x="18" y="20" transform="rotate(90 18 18)">100%</text>
    </svg>
  </div>
</div>

  );
};

export default GraficoComponente;


