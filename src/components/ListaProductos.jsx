import React, { useState } from "react";

function ProductCard({ p, onGuardar, saving, saved }) {
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

      <div className="card__actions" style={{ marginTop: 8 }}>
        <button
          className="btn btn--primary"
          onClick={() => onGuardar(p)}
          disabled={saving || saved}
        >
          {saved ? "Guardado" : saving ? "Guardando…" : "Guardar"}
        </button>
      </div>
    </article>
  );
}

export default function ListaProductos({ tipo = "recientes", items = [], max }) {
  const [savingId, setSavingId] = useState(null);
  const [savedIds, setSavedIds] = useState(new Set());
  const [errMsg, setErrMsg] = useState("");
  const [okMsg, setOkMsg] = useState("");

  // URL desde .env (sin puerto)
  // Opción A (recomendada): VITE_HISTORIAL_GUARDAR_URL=https://etiketa-backend.onrender.com/historial/guardar-escaneo
  const GUARDAR_URL_ENV = import.meta.env.VITE_HISTORIAL_GUARDAR_URL;
  // Opción B: base + path
  const API_BASE = (import.meta.env.VITE_API_BASE ?? "https://etiketa-backend.onrender.com").replace(/\/+$/, "");
  const HIST_GUARDAR_PATH = "/historial/guardar-escaneo";
  const GUARDAR_URL = GUARDAR_URL_ENV || `${API_BASE}${HIST_GUARDAR_PATH}`;

  // Email del usuario (si lo guardaste al crear la cuenta)
  const usuarioEmail = localStorage.getItem("usuarioEmail") || null;

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
        },
        body: JSON.stringify({
          producto: {
            id: p.id,
            nombre: p.nombre,
            marca: p.marca,
            imagen: p.img,
            riesgo: p.riesgo,
          },
          email: usuarioEmail,                  // opcional para asociar al user
          fecha: new Date().toISOString(),      // opcional
        }),
      });

      if (!res.ok) {
        let msg = `Error ${res.status}`;
        try {
          const ct = res.headers.get("content-type") || "";
          if (ct.includes("application/json")) {
            const j = await res.json();
            msg = j?.message || j?.error || msg;
          } else {
            const t = await res.text();
            msg = t || msg;
          }
        } catch {}
        throw new Error(msg);
      }

      // 👇 Confirmación: log y backup local del último escaneo
      const data = await res.json().catch(() => null);
      console.log("Guardado OK:", data);
      localStorage.setItem(
        "ultimoEscaneo",
        JSON.stringify({
          id: p.id,
          nombre: p.nombre,
          marca: p.marca,
          img: p.img,
          riesgo: p.riesgo,
          email: usuarioEmail,
          fecha: new Date().toISOString(),
        })
      );

      setSavedIds((old) => new Set([...old, p.id]));
      setOkMsg("¡Escaneo guardado!");
    } catch (err) {
      console.error("guardar-escaneo:", err);
      setErrMsg(err?.message || "No se pudo guardar el escaneo.");
    } finally {
      setSavingId(null);
    }
  };

  // items a mostrar
  let mostrar = Array.isArray(items) ? items : [];
  if (typeof max === "number") mostrar = mostrar.slice(0, max);

  return (
    <div className="grid" data-section={tipo}>
      {errMsg && (
        <p className="error" style={{ gridColumn: "1 / -1" }}>
          Error: {errMsg}
        </p>
      )}
      {okMsg && !errMsg && (
        <p className="ok" style={{ gridColumn: "1 / -1" }}>
          {okMsg}
        </p>
      )}

      {(!Array.isArray(mostrar) || !mostrar.length) && (
        <p style={{ gridColumn: "1 / -1" }}>No hay productos para mostrar.</p>
      )}

      {Array.isArray(mostrar) &&
        mostrar.map((p) => (
          <ProductCard
            key={`${tipo}-${p.id}`}
            p={p}
            onGuardar={onGuardar}
            saving={savingId === p.id}
            saved={savedIds.has(p.id)}
          />
        ))}
    </div>
  );
}


