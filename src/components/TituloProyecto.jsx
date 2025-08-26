import React from "react";
import "../styles/TituloProyecto.css";

function TituloProyecto() {
  // ejemplo de función para el botón
  const toggleFlash = () => {
    console.log("Flash ON/OFF");
  };

  return (
    <div className="topbar">
      {/* Logo */}
      <img 
        src="/Logo chico (1).png" 
        alt="Logo" 
        className="topbar__logo" 
      />

      {/* Botón Flash */}
      <button className="flash-btn" onClick={toggleFlash}>
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 24 24" 
        >
          <path d="M7 2v11h3v9l7-12h-4l4-8z"/>
        </svg>
      </button>
    </div>
  );
}

export default TituloProyecto;
