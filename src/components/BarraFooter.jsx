import React from "react";
import "../styles/BarraFooter.css";

const BarraFooter = () => {
  return (
    <footer className="barra-footer">
      <nav>
        <ul style={{ display: "flex", justifyContent: "space-around", listStyle: "none", padding: 0 }}>
          <li>HOME</li>
          <li>COMPARAR</li>
          <li>ESCANEA</li>
          <li>EXPLORA</li>
          <li>AJUSTES</li>
        </ul>
      </nav>
    </footer>
  );
};

export default BarraFooter;
