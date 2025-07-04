// src/pages/ResultPage.jsx
import React, { useEffect, useState } from "react";
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
  const [producto, setProducto] = useState(null);

  useEffect(() => {
    const productoGuardado = localStorage.getItem("productoDetectado");
    if (productoGuardado) {
      setProducto(JSON.parse(productoGuardado));
    }
  }, []);

  const componentes = [
    { nombre: "Jarabe de maíz", riesgo: "Dañino", color: "rojo" },
    { nombre: "Colorante E-150d", riesgo: "Dañino", color: "rojo" },
    { nombre: "Cafeína", riesgo: "Alto", color: "amarillo" },
    { nombre: "Ácido fosfórico", riesgo: "Moderado", color: "amarillo" },
    { nombre: "Aromatizante", riesgo: "Moderado", color: "amarillo" },
  ];

  if (!producto) {
    return <p style={{ textAlign: "center", padding: "2rem" }}>Cargando producto...</p>;
  }

  return (
    <div className="mobile-wrapper">
      <div className="result-page">
        <div className="contenido-scroll">
          <EncabezadoProducto
            nombre={producto.product_name}
            marca={producto.brands}
            imagen={producto.image_url}
          />
  
          <div className="botones-analisis">
            <BotonAnalisis
              activo={seccionActiva === "analisis"}
              onClick={() => setSeccionActiva("analisis")}
            />
            <BotonAlternativa
              activo={seccionActiva === "alternativa"}
              onClick={() => setSeccionActiva("alternativa")}
            />
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
              <p><strong>{producto.recomendacion || "Agua saborizada sin azúcar"}</strong></p>
            </div>
          )}
        </div>
        </div>

      <BarraFooter /> {}
</div>
);
};

export default ResultPage;