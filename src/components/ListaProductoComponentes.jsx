import React from "react";

const ListaProductoComponentes = ({ componentes }) => {
  return (
    <div className="listaproducto-componentes">
      <h3>Composición</h3>
      <ul>
        {componentes.map((comp, i) => (
          <li key={i}>
            {comp.nombre} ({comp.riesgo})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListaProductoComponentes;
