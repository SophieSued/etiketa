import React, { useEffect, useRef, useState } from "react";
import "../styles/ListaProductos.css";

function ProductCard({ p }) {
  return (
    <article className="card">
      <div className="card__figure">
        <img src={p.img} alt={p.nombre} />
      </div>
      <div className="card__text">
        <h4 className="card__title">{p.nombre}</h4>
        <span className="card__brand">{p.marca}</span>
      </div>
      <div className={`card__risk card__risk--${p.riesgo}`} />
    </article>
  );
}

export default function ListaProductos({
  tipo = "recientes",
  items = [],
  max,
  autoGuardar = true,
}) {
  const [savingId, setSavingId] = useState(null);
  const [savedIds, setSavedIds] = useState(new Set());
  const [errMsg, setErrMsg] = useState("");
  const [okMsg, setOkMsg] = useState("");
  const triedIdsRef = useRef(new Set());

  const GUARDAR_URL_ENV = import.meta.env.VITE_HISTORIAL_GUARDAR_URL;
  const API_BASE = (import.meta.env.VITE_API_BASE ?? "https://etiketa-backend.onrender.com").replace(/\/+$/, "");
  const HIST_GUARDAR_PATH = "/historial/guardar-escaneo";
  const GUARDAR_URL = GUARDAR_URL_ENV || `${API_BASE}${HIST_GUARDAR_PATH}`;

  const usuarioEmail = localStorage.getItem("usuarioEmail") || null;
  const token =
    localStorage.getItem("accessToken") || localStorage.getItem("token") || null;

  const onGuardar = async (p) => {
    setErrMsg("");
    setOkMsg("");
    setSavingId(p.id);

    try {
      const res = await fetch(GUARDAR_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ productoId: p.id }),
      });

      if (!res.ok) {
        const txt = await res.text();
        throw new Error(`HTTP ${res.status}: ${txt}`);
      }

      const data = await res.json();
      console.log("Guardado OK:", data);
      setSavedIds((old) => new Set([...old, p.id]));
      setOkMsg(data?.mensaje || "¡Escaneo guardado!");
    } catch (err) {
      console.error("guardar-escaneo:", err);
      setErrMsg(err?.message || "No se pudo guardar el escaneo.");
    } finally {
      setSavingId(null);
    }
  };

  let mostrar = Array.isArray(items) ? items : [];
  if (typeof max === "number") mostrar = mostrar.slice(0, max);

  useEffect(() => {
    if (!autoGuardar) return;

    (async () => {
      for (const p of mostrar) {
        if (!p?.id) continue;
        if (savedIds.has(p.id)) continue;
        if (triedIdsRef.current.has(p.id)) continue;
        triedIdsRef.current.add(p.id);
        await onGuardar(p);
      }
    })();
  }, [autoGuardar, JSON.stringify(mostrar)]);

  return (
    
    <div className="product-row" data-section={tipo}>
      {errMsg && <p className="error">Error: {errMsg}</p>}
      {okMsg && !errMsg && <p className="ok">{okMsg}</p>}

      {(!Array.isArray(mostrar) || !mostrar.length) && (
        <p>No hay productos para mostrar.</p>
      )}

      {Array.isArray(mostrar) &&
        mostrar.map((p) => <ProductCard key={`${tipo}-${p.id}`} p={p} />)}
    </div>
  );
}
