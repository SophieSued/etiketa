import React, { useState } from "react";
import { useNavigate } from "react-router-dom";  
import StepDots from "../components/StepDots";
import "../styles/Formularios.css";

const FiltrosPage = () => {
  const opciones = ["Celiaquía", "Vegano/a", "Alergía", "Otra restricción"];
  const [seleccionados, setSeleccionados] = useState([]);
  const navigate = useNavigate();  

  const toggleSeleccion = (opcion) => {
    setSeleccionados((prev) =>
      prev.includes(opcion)
        ? prev.filter((o) => o !== opcion)
        : [...prev, opcion]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Filtros seleccionados:", seleccionados);

    navigate("/inicio");
  };

  return (
    <div className="auth-page">
      {}
      <div className="logo-container">
        <img
          src="/Logo chico (1).png"
          alt="Logo Etiketa"
          className="logo"
        />
      </div>

      {}
      <StepDots />

      {}
      <form className="formulario formulario--registro" onSubmit={handleSubmit}>
        <h2 style={{ textAlign: "left" }}>Personaliza tu experiencia</h2>
        <p style={{ marginTop: 0, color: "var(--c-muted)", textAlign: "left" }}>
          Selecciona las restricciones que tienes
          <br />
          para recibir recomendaciones más precisas
        </p>

        {}
        <div className="botones-filtros">
          {opciones.map((opcion) => {
            const activo = seleccionados.includes(opcion);
            return (
              <button
                type="button"
                key={opcion}
                className={`chip-btn ${activo ? "is-active" : ""}`}
                onClick={() => toggleSeleccion(opcion)}
                aria-pressed={activo}
              >
                {opcion}
              </button>
            );
          })}
        </div>

        {}
        <button type="submit" className="submit-btn">
          Crear cuenta
        </button>
      </form>
    </div>
  );
};

export default FiltrosPage;


