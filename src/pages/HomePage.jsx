import React, { useEffect, useState } from "react";
import HeaderHome from "../components/HeaderHome";
import SearchBar from "../components/SearchBar";
import FiltrosRapidos from "../components/FiltrosRapidos";
import EstadisticasBox from "../components/EstadisticasBox";
import ListaProductos from "../components/ListaProductos";
import BarraFooter from "../components/BarraFooter";
import "../styles/HomePage.css";
import "../styles/ListaProductos.css";

const API_BASE = (import.meta.env.VITE_API_BASE ?? "https://etiketa-backend.onrender.com").replace(/\/+$/, "");

export default function HomePage() {
  const [recientes, setRecientes] = useState([]);
  const [favoritos, setFavoritos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const token =
          localStorage.getItem("accessToken") || localStorage.getItem("token");

        const res = await fetch(`${API_BASE}/historial/ver-historial`, {
          headers: {
            Accept: "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
        });

        const text = await res.text();
        console.log("[/ver-historial RAW]", text);

        if (!res.ok) throw new Error(`HTTP ${res.status}: ${text}`);

        const { historial } = JSON.parse(text);

        const items = (historial || []).map((h) => ({
          id: h.producto_id ?? h.id ?? h.code,
          nombre: h.product_name ?? "Producto",
          marca: h.brands ?? h.marca ?? "—",
          img: h.image_url ?? "/img/nivea.png",
          riesgo: "medio",
        }));

        setRecientes(items);
      } catch (e) {
        console.error("Error cargando historial:", e);
        setError(e.message || "No se pudo cargar el historial.");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div className="homepage app">
      <div className="homepage__content">
        <HeaderHome />
        <SearchBar />
        <FiltrosRapidos />
        <EstadisticasBox />

        {
          
        }
        <section className="section section--recientes cards-compact">
          <h3>Recientes ➤</h3>
          {loading ? (
            <p>Cargando...</p>
          ) : error ? (
            <p style={{ color: "red" }}>{error}</p>
          ) : (
            <ListaProductos tipo="recientes" items={recientes} autoGuardar={false} />
          )}
        </section>

        <section className="section section--favoritos cards-compact">
          <h3>Favoritos ☆</h3>
          <ListaProductos tipo="favoritos" items={favoritos} autoGuardar={false} />
        </section>
      </div>

      <div className="homepage__nav">
        <BarraFooter />
      </div>
    </div>
  );
}

