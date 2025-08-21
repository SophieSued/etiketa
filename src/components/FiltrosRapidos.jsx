import React from "react";

const DEFAULT_CHIPS = ["Alergias", "Vegano", "Celiaco", "Enfermedades dermatologicas"];

export default function FiltrosRapidos({ chips = DEFAULT_CHIPS, onSelect }) {
  return (
    <section className="home__filters">
      <h3>Filtros rápidos</h3>
      <div className="chips">
        {chips.map((c) => (
          <button
            key={c}
            className="chip"
            onClick={() => onSelect?.(c)}
            type="button"
          >
            {c}
          </button>
        ))}
      </div>
    </section>
  );
}
