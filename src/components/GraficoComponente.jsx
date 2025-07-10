import React from "react";
import "../styles/ResultPage.css";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip } from "chart.js";

ChartJS.register(ArcElement, Tooltip);

const GraficoComponente = () => {
  const data = {
    labels: ["Bajo", "Moderado", "Alto", "Dañino"],
    datasets: [
      {
        data: [40, 30, 20, 10],
        backgroundColor: ["limegreen", "gold", "orange", "red"],
        borderWidth: 0,
      },
    ],
  };

  const options = {
    cutout: "70%", 
    plugins: {
      tooltip: { enabled: false },
    },
  };

  return (
    <div className="grafico-componente">
      <h3>Análisis de componentes:</h3>
      <div className="donut-container">
        <Doughnut data={data} options={options} />
        <div className="donut-label">%100</div>
      </div>
    </div>
  );
};

export default GraficoComponente;
