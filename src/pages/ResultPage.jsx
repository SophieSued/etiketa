import React, { useEffect, useState, useRef } from "react";
import "../styles/ResultPage.css";
import EncabezadoProducto from "../components/EncabezadoProducto";
import BotonAnalisis from "../components/BotonAnalisis";
import BotonAlternativa from "../components/BotonAlternativa";
import GraficoComponente from "../components/GraficoComponente";
import ListaProductoComponentes from "../components/ListaProductoComponentes";
import InfoClasificar from "../components/InfoClasificar";
import BarraFooter from "../components/BarraFooter";


const API_BASE = (import.meta.env.VITE_API_BASE ?? "https://etiketa-backend.onrender.com").replace(/\/+$/, "");
const GUARDAR_URL =
  import.meta.env.VITE_HISTORIAL_GUARDAR_URL || `${API_BASE}/historial/guardar-escaneo`;


const normalizarProducto = (prod) => {
  if (!prod || typeof prod !== "object") return null;

  const id =
    prod?.id ??
    prod?._id ??
    prod?.code ??
    prod?.codigo_barra ??
    prod?.ean ??
    prod?.gtin ??
    prod?.barcode ??
    null;

  if (id == null) return null;

  return {
    id, 
    nombre: prod?.product_name ?? prod?.nombre ?? "Producto",
    marca: prod?.brands ?? prod?.marca ?? "—",
    imagen: prod?.image_url ?? prod?.img ?? prod?.imagen ?? "/img/nivea.png",
    riesgo: String(prod?.riesgo ?? "medio").toLowerCase(),
  };
};

const ResultPage = () => {
  const [seccionActiva, setSeccionActiva] = useState("analisis");
  const [producto, setProducto] = useState(null);
  const [componentes, setComponentes] = useState([]);
  const savedOnceRef = useRef(false); 

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

 
  useEffect(() => {
    if (!producto || savedOnceRef.current) return;

    const p = normalizarProducto(producto);
    if (!p) {
      console.warn("[historial] Producto sin ID válido. Keys:", Object.keys(producto || {}));
      return;
    }

    const ultimoId = localStorage.getItem("ultimoEscaneoId");
    if (ultimoId && String(ultimoId) === String(p.id)) {
      savedOnceRef.current = true;
      return;
    }

    savedOnceRef.current = true;

    const email = localStorage.getItem("usuarioEmail") || null;
    const token =
      localStorage.getItem("accessToken") ||
      localStorage.getItem("token") ||
      null;

    const headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };


    const scoreProducto =
      producto?.calificacion ??
      producto?.score ??
      producto?.puntaje ??
      producto?.seguridadScore ??
      null;

    (async () => {
      try {
        console.log("[historial] POST", GUARDAR_URL, { productoId: p.id, nombre: p.nombre });

        
        const idParaEnviar =
          typeof p.id === "string" && /^\d+$/.test(p.id) ? Number(p.id) : p.id;

        const res = await fetch(GUARDAR_URL, {
          method: "POST",
          headers,
          body: JSON.stringify({
            
            productoId: idParaEnviar,
            nombre: p.nombre,
            marca: p.marca,
            imagen: p.imagen,
            riesgo: p.riesgo,
            ...(scoreProducto != null ? { puntaje: scoreProducto } : {}),
            email,
            fecha: new Date().toISOString(),
          }),
        });

        const ct = res.headers.get("content-type") || "";
        const payload = ct.includes("application/json")
          ? await res.json().catch(() => null)
          : await res.text().catch(() => "");

        if (!res.ok) {
          throw new Error(
            `HTTP ${res.status} ${
              typeof payload === "string" ? payload : JSON.stringify(payload)
            }`
          );
        }

        console.log("[historial] Guardado OK:", payload);

        
        localStorage.setItem(
          "ultimoEscaneo",
          JSON.stringify({
            id: p.id,
            nombre: p.nombre,
            marca: p.marca,
            img: p.imagen,
            riesgo: p.riesgo,
            email,
            fecha: new Date().toISOString(),
            ...(scoreProducto != null ? { puntaje: scoreProducto } : {}),
          })
        );
        localStorage.setItem("ultimoEscaneoId", String(p.id));
      } catch (e) {
        console.warn("[historial] No se pudo guardar:", e?.message || e);
      }
    })();
  }, [producto]);

  if (!producto) {
    return <p style={{ textAlign: "center", padding: "2rem" }}>Cargando producto...</p>;
  }

  const scoreParaGrafico =
    producto.calificacion ??
    producto.score ??
    producto.puntaje ??
    producto.seguridadScore ??
    producto.scoreAlternativa ??
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
              <GraficoComponente score={Number(scoreParaGrafico)} />
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
