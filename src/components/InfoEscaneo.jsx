import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/InfoEscaneo.css";

const BASE_URL = import.meta.env.VITE_API_URL ?? "https://etiketa-backend.onrender.com";
const esCodigo = (s) => /^\d{7,14}$/.test(s.trim());

async function buscarProducto(q) {
  const params = new URLSearchParams();
  if (esCodigo(q)) params.set("code", q.trim());
  else params.set("nombre", q.trim());

  const url = `${BASE_URL}/productos/buscar?${params.toString()}`;
  console.log("[buscarProducto] URL:", url);

  const res = await fetch(url, { headers: { Accept: "application/json" } });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);

  const data = await res.json();
  console.log("[buscarProducto] resultados:", data);
  return Array.isArray(data) ? data : [];
}

const InfoEscaneo = () => {
  const [q, setQ] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    const query = q.trim();
    if (!query) return;

    setLoading(true);
    setMsg("");
    try {
      const prods = await buscarProducto(query);

      if (!prods.length) {
        setMsg("No encontramos ningún producto con ese dato.");
        return;
      }

      // Guardar en localStorage igual que BarcodeScanner
      localStorage.setItem("productoDetectado", JSON.stringify(prods[0]));
      navigate("/resultado");
    } catch (err) {
      console.error("[InfoEscaneo] error:", err);
      setMsg("Ups, hubo un problema. Intentá de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="info-limite">
      <div className="bloque-info">
        <h3>Consejos para escanear</h3>
        <ul>
          <li>Mantené el código de barras dentro del marco</li>
          <li>Buena iluminación mejora el resultado</li>
          <li>Mantené el teléfono firme</li>
        </ul>
      </div>

      <div className="bloque-info">
        <h3>Estándares de clasificación</h3>
        <p>
          Nuestro sistema utiliza estándares reconocidos para identificar productos
          y categorías.
        </p>
      </div>

      <div className="bloque-info">
        <form onSubmit={onSubmit}>
          <label htmlFor="busqueda" className="busqueda-label">
            ¿No encontrás el código?
          </label>
          <input
            type="text"
            id="busqueda"
            className="busqueda-input"
            placeholder="Buscar por nombre o código de barras"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            disabled={loading}
          />
        </form>

        {loading && <small>Buscando…</small>}
        {msg && <small style={{ color: "#c00" }}>{msg}</small>}
      </div>
    </div>
  );
};

export default InfoEscaneo;
