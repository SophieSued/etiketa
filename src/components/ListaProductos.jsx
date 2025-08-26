import React, { useEffect, useState } from "react";

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

export default function ListaProductos({ tipo = "recientes", items, max }) {
  const [data, setData] = useState([]);
  const [state, setState] = useState("idle"); 

  useEffect(() => {
    if (tipo !== "recientes") return;                    
    if (Array.isArray(items) && items.length) return;    

    const controller = new AbortController();
    setState("loading");

    const API_BASE = "http://localhost:3000";

    fetch(`${API_BASE}/historial/ver-historial`, { signal: controller.signal })
      .then((r) => r.json())
      .then((json) => {
        const arr = Array.isArray(json.items) ? json.items : json;
        const normalizados = arr.map((it, idx) => ({
          id: it.id ?? it._id ?? idx,
          nombre: it.nombre ?? it.name ?? "Producto",
          marca: it.marca ?? it.brand ?? "—",
          img: it.imagen ?? it.img ?? it.imageUrl ?? "/img/nivea.png",
          riesgo: String(it.riesgo ?? it.risk ?? "medio").toLowerCase(),
        }));

        setData(normalizados);
        setState(normalizados.length ? "ok" : "empty");
      })
      .catch((err) => {
        console.error("Error historial:", err);
        setState("error");
      });

    return () => controller.abort();
  }, [tipo, items]);

  let mostrar = data;
  if (Array.isArray(items) && items.length) mostrar = items;
  if (typeof max === "number") mostrar = mostrar.slice(0, max);

  return (
    <div className="grid" data-section={tipo}>
      {state === "loading" && <p>Cargando…</p>}
      {state === "empty" && <p>No hay recientes aún.</p>}
      {state === "error" && <p></p>}

      {state === "ok" &&
        mostrar.map((p) => <ProductCard key={`${tipo}-${p.id}`} p={p} />)}
    </div>
  );
}
