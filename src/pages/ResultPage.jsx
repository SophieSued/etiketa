import React, { useEffect, useState } from "react";
import "../styles/ResultPage.css";
import EncabezadoProducto from "../components/EncabezadoProducto";
import BotonAnalisis from "../components/BotonAnalisis";
import BotonAlternativa from "../components/BotonAlternativa";
import GraficoComponente from "../components/GraficoComponente";
import ListaProductoComponentes from "../components/ListaProductoComponentes";
import InfoClasificar from "../components/InfoClasificar";
import BarraFooter from "../components/BarraFooter";

const ResultPage = () => {
  const [seccionActiva, setSeccionActiva] = useState("analisis");
  const [producto, setProducto] = useState(null);
  const [componentes, setComponentes] = useState([]);

  useEffect(() => {
    const productoGuardado = localStorage.getItem("productoDetectado");
    if (productoGuardado) {
      const prod = JSON.parse(productoGuardado);
      setProducto(prod);

      if (prod.ingredients_text) {
        const texto = prod.ingredients_text;
        const lista = texto.split(",").map((nombre) => nombre.trim());

        const conRiesgo = lista.map((nombre) => {
          let riesgo = "Desconocido";
          let color = "gris";

          if (nombre.toLowerCase().includes("alcohol")) {
            riesgo = "Moderado";
            color = "amarillo";
          } else if (nombre.toLowerCase().includes("fragrance")) {
            riesgo = "Dañino";
            color = "rojo";
          }

          return { nombre, riesgo, color };
        });

        setComponentes(conRiesgo);
      }
    }
  }, []);

  if (!producto) {
    return <p style={{ textAlign: "center", padding: "2rem" }}>Cargando producto...</p>;
  }

  return (
    <div className="mobile-wrapper">
      <div className="contenido-scroll">
        <div className="result-page">
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
              <InfoClasificar />
              <ListaProductoComponentes componentes={componentes} />
            </>
          ) : (
            /* === Tarjeta alternativa estilo blanco con score a la derecha === */
            <div className="alternativa-card-blanca">
              <img
                src={producto.alternativa_img || "bagovit.jpeg"}
                alt="Producto alternativo"
                className="img-alt-blanca"
              />

              <div className="alt-textos">
                <h2 className="alt-nombre">
                  {producto.recomendacion || "Autobronceante Bagovit"}
                </h2>
                <p className="alt-marca">
                  {producto.marcaAlternativa || "Bagovit"}
                </p>
              </div>

              <div className="alt-rating">
                <span className="alt-num">
                  {(producto.scoreAlternativa ?? 6.2).toFixed(1)}
                </span>
                <span className="alt-suf">/10</span>
              </div>
            </div>
          )}
        </div>
      </div>

      <BarraFooter />
    </div>
  );
};

export default ResultPage;
