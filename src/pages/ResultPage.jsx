import React, { useEffect, useState, useRef } from "react";
import "../styles/ResultPage.css";
import EncabezadoProducto from "../components/EncabezadoProducto";
import BotonAnalisis from "../components/BotonAnalisis";
import BotonAlternativa from "../components/BotonAlternativa";
import GraficoComponente from "../components/GraficoComponente";
import ListaProductoComponentes from "../components/ListaProductoComponentes";
import InfoClasificar from "../components/InfoClasificar";
import BarraFooter from "../components/BarraFooter";

// URLs (sin barra final)
const API_BASE = (import.meta.env.VITE_API_BASE ?? "https://etiketa-backend.onrender.com").replace(/\/+$/, "");
const GUARDAR_URL =
  import.meta.env.VITE_HISTORIAL_GUARDAR_URL || `${API_BASE}/historial/guardar-escaneo`;

const normalizarProducto = (prod) => ({
  id: prod?.id ?? prod?.code ?? prod?.ean ?? Date.now(),
  nombre: prod?.product_name ?? prod?.nombre ?? "Producto",
  marca: prod?.brands ?? prod?.marca ?? "—",
  imagen: prod?.image_url ?? prod?.img ?? prod?.imagen ?? "/img/nivea.png",
  riesgo: String(prod?.riesgo ?? "medio").toLowerCase(),
});

const ResultPage = () => {
  const [seccionActiva, setSeccionActiva] = useState("analisis");
  const [producto, setProducto] = useState(null);
  const [componentes, setComponentes] = useState([]);
  const savedOnceRef = useRef(false); // evita doble POST

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
          const lower = nombre.toLowerCase();
          if (lower.includes("alcohol")) {
            riesgo = "Moderado";
            color = "amarillo";
          } else if (lower.includes("fragrance") || lower.includes("parfum")) {
            riesgo = "Dañino";
            color = "rojo";
          }
          return { nombre, riesgo, color };
        });

        setComponentes(conRiesgo);
      }
    }
  }, []);

  // Guardado automático en historial (una sola vez)
  useEffect(() => {
    if (!producto || savedOnceRef.current) return;

    const p = normalizarProducto(producto);
    const ultimoId = localStorage.getItem("ultimoEscaneoId");
    if (ultimoId && String(ultimoId) === String(p.id)) {
      savedOnceRef.current = true;
      return;
    }

    savedOnceRef.current = true;

    const email = localStorage.getItem("usuarioEmail") || null;
    const token = localStorage.getItem("token"); // si algún día lo usan

    const headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
    };
    if (token) headers.Authorization = `Bearer ${token}`;

    // Tomamos el score que venga de tu backend (ajusta el orden si tu key real es otra)
    const scoreProducto =
      producto?.score ??
      producto?.puntaje ??
      producto?.seguridadScore ??
      null;

    (async () => {
      try {
        const res = await fetch(GUARDAR_URL, {
          method: "POST",
          headers,
          body: JSON.stringify({
            producto: { ...p, puntaje: scoreProducto }, // ← opcional pero útil
            email,                                       // opcional
            fecha: new Date().toISOString(),
          }),
        });

        if (!res.ok) {
          const t = await res.text().catch(() => "");
          throw new Error(`HTTP ${res.status} ${t}`);
        }

        await res.json().catch(() => null);

        localStorage.setItem(
          "ultimoEscaneo",
          JSON.stringify({ ...p, email, fecha: new Date().toISOString(), puntaje: scoreProducto })
        );
        localStorage.setItem("ultimoEscaneoId", String(p.id));
        console.log("Guardado OK en historial.");
      } catch (e) {
        console.warn("No se pudo guardar:", e?.message || e);
      }
    })();
  }, [producto]);

  if (!producto) {
    return <p style={{ textAlign: "center", padding: "2rem" }}>Cargando producto...</p>;
  }

  // Score que le vamos a pasar al gráfico (0–10 ideal; el componente ya normaliza 0–1 o 0–100)
  const scoreParaGrafico =
    producto.score ??
    producto.puntaje ??
    producto.seguridadScore ??
    producto.scoreAlternativa ?? // fallback visual si aún no llega el principal
    null;

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
              {/* ⬇️ Ahora el gráfico usa el valor del backend */}
              <GraficoComponente score={Number(producto?.calificacion)} />

              <InfoClasificar />
              <ListaProductoComponentes componentes={componentes} />
            </>
          ) : (
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
                <p className="alt-marca">{producto.marcaAlternativa || "Bagovit"}</p>
              </div>
              <div className="alt-rating">
                <span className="alt-num">{(producto.scoreAlternativa ?? 6.2).toFixed(1)}</span>
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



