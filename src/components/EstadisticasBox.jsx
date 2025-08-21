import React from "react";
import { FiBarChart2, FiTrendingUp } from "react-icons/fi";

export default function EstadisticasBox({
  total = 55,
  label = "Productos analizados",
  trendText = "+15% esta semana",
  subText = "Promedio 7.8/10",
}) {
  return (
    <section className="stats">
      <div className="stats__left">
        <div className="stats__icon"><FiBarChart2 /></div>
        <div>
          <div className="stats__big">{total}</div>
          <div className="stats__label">{label}</div>
        </div>
      </div>
      <div className="stats__right">
        <div className="stats__trend"><FiTrendingUp /> {trendText}</div>
        <div className="stats__sub">{subText}</div>
      </div>
    </section>
  );
}
