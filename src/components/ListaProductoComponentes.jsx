import React, { useState } from "react";

const ListaProductoComponentes = ({ componentes }) => {
  const [verMas, setVerMas] = useState(false);

  const getColorClass = (riesgo) => {
    if (riesgo === "Daño") return "punto-rojo";
    if (riesgo === "Alto") return "punto-naranja";
    return "punto-amarillo";
  };

  const componentesAMostrar = verMas ? componentes : componentes.slice(0, 5);

  return (
    <div className="listaproducto-componentes">
      <h3>Composición</h3>
      <ul>
        {componentesAMostrar.map((comp, i) => (
          <li key={i}>
            {comp.nombre}
            <span className="etiqueta-riesgo">
              ({comp.riesgo})
              <span className={getColorClass(comp.riesgo)}></span>
            </span>
          </li>
        ))}
      </ul>

      {

      }
      {componentes.length > 5 && (
        <div className="boton-vermas">
          <button onClick={() => setVerMas(!verMas)}>
            {verMas ? "Ver menos" : "Ver más"}
          </button>
        </div>
      )}
    </div>
  );
};

export default ListaProductoComponentes;


