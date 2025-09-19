// src/pages/Inicio.jsx
import React, { useEffect, useState } from "react";
import ListaProductos from "../components/ListaProductos";

const API_BASE = (import.meta.env.VITE_API_BASE ?? "https://etiketa-backend.onrender.com").replace(/\/+$/, "");
// Si tu back usa otra ruta para listar, ponela en .env como VITE_HISTORIAL_LISTAR_URL
const LISTAR_URL = import.meta.env.VITE_HISTORIAL_LISTAR_URL || `${API_BASE}/historial/ver-historial`;

export default function Inicio() {
  const [recientes, setRecientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  // si tu back filtra por usuario, pasamos el email guardado al crear la cuenta
  const email = localStorage.getItem("usuarioEmail") || null;

  useEffect(() => {
    const ctrl = new AbortController();

    (async () => {
      try {
        setErr("");
        setLoading(true);

        const url = email
          ? `${LISTAR_URL}?email=${encodeURIComponent(email)}`
          : LISTAR_URL;

        const r = await fetch(url, {
          signal: ctrl.signal,
          headers: { Accept: "application/json" },
        });
        if (!r.ok) throw new Error(`HTTP ${r.status}`);

        const json = await r.json();

        // Soportar ambos formatos: {items:[...]} o [...]
        const arr = Array.isArray(json?.items) ? json.items : (Array.isArray(json) ? json : []);

        // Normalizar a la forma que usa tu <ProductCard />
        const normalizados = arr.map((it, idx) => ({
          id: it.id ?? it._id ?? idx,
          nombre: it.nombre ?? it.name ?? "Producto",
          marca: it.marca ?? it.brand ?? "—",
          img: it.imagen ?? it.img ?? it.imageUrl ?? "/img/nivea.png",
          riesgo: String(it.riesgo ?? it.risk ?? "medio").toLowerCase(),
        }));

        setRecientes(normalizados);
      } catch (e) {
        if (e.name !== "AbortError") {
          setErr(e.message || "No se pudo cargar el historial");
        }
      } finally {
        setLoading(false);
      }
    })();

    return () => ctrl.abort();
  }, [email]);

  return (
    <div className="home">
      {/* ... tu header/buscador/estadísticas ... */}

      <h3>Recientes ▸</h3>
      {loading && <p>Cargando…</p>}
      {err && !loading && <p className="error">Error: {err}</p>}
      {!loading && !err && (
        <ListaProductos tipo="recientes" items={recientes} />
      )}

      <h3 style={{ marginTop: 24 }}>Favoritos ☆</h3>
      <p>No hay productos para mostrar.</p>
    </div>
  );
}
