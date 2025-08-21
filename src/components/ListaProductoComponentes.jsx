import React, { useState } from "react";
import "../styles/ResultPage.css";

const ListaProductoComponentes = ({ componentes }) => {
  const [verMas, setVerMas] = useState(false);

  const getColorStyle = (riesgoCrudo) => {
    const riesgo = riesgoCrudo?.trim().toLowerCase(); 

    switch (riesgo) {
      case "seguro":
        return { color: "#00966c", bg: "#00966c" };
      case "bajo":
        return { color: "#f5e300", bg: "#f5e300" };
      case "moderado":
        return { color: "#e17600", bg: "#e17600" };
      case "alto":
        return { color: "#db2323", bg: "#db2323" };
      default:
        return { color: "#ccc", bg: "#ccc" };
    }
  };

  const componentesAMostrar = verMas ? componentes : componentes.slice(0, 5);

  return (
    <div className="listaproducto-componentes">
      <h3>Composición</h3>
      <ul>
        {componentesAMostrar.map((comp, i) => {
          const estilo = getColorStyle(comp.riesgo);
          return (
            <li key={i}>
              <span className="nombre-componente">{comp.nombre}</span>
              <span className="etiqueta-wrapper">
                <span
                  className="color-box"
                  style={{ backgroundColor: estilo.bg }}
                ></span>
                <span className="etiqueta-texto" style={{ color: "#333" }}>
                  {comp.riesgo}
                </span>
              </span>
            </li>
          );
        })}
      </ul>

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
