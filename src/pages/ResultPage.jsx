import React, { useState } from "react";
import "../styles/ResultPage.css";
import EncabezadoProducto from "../components/EncabezadoProducto";
import BotonAnalisis from "../components/BotonAnalisis";
import BotonAlternativa from "../components/BotonAlternativa";
import GraficoComponente from "../components/GraficoComponente";
import ListaProductoComponentes from "../components/ListaProductoComponentes";
import BotonVerMas from "../components/BotonVerMas";
import InfoClasificar from "../components/InfoClasificar";
import BarraFooter from "../components/BarraFooter";

const ResultPage = () => {
  const [seccionActiva, setSeccionActiva] = useState("analisis");

  const nombre = "Coca Cola";
  const marca = "Coca-Cola Company";
  const calificacion = "Mala";
  const recomendacion = "Agua saborizada sin azúcar";

  const componentes = [
    { nombre: "Jarabe de maíz", riesgo: "Dañino", color: "rojo" },
    { nombre: "Colorante E-150d", riesgo: "Dañino", color: "rojo" },
    { nombre: "Cafeína", riesgo: "Alto", color: "amarillo" },
    { nombre: "Ácido fosfórico", riesgo: "Moderado", color: "amarillo" },
    { nombre: "Aromatizante", riesgo: "Moderado", color: "amarillo" },
  ];

  return (
    <div className="result-page">
      <EncabezadoProducto nombre={nombre} marca={marca} />

      <div className="botones-analisis">
        <BotonAnalisis activo={seccionActiva === "analisis"} onClick={() => setSeccionActiva("analisis")} />
        <BotonAlternativa activo={seccionActiva === "alternativa"} onClick={() => setSeccionActiva("alternativa")} />
      </div>

      {seccionActiva === "analisis" ? (
        <>
          <GraficoComponente />
          <ListaProductoComponentes componentes={componentes} />
          <BotonVerMas />
          <InfoClasificar />
        </>
      ) : (
        <div className="alternativa-recomendada">
          <h2>Recomendación alternativa</h2>
          <p><strong>{recomendacion}</strong></p>
        </div>
      )}

      <BarraFooter />
    </div>
  );
};

export default ResultPage;

