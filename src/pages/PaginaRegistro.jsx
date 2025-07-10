import React from "react";
import FormularioRegistro from "../components/FormularioRegistro";
import "../styles/Formularios.css";

const PaginaRegistro = () => {
  const manejarRegistro = async (datos) => {
    try {
        const respuesta = await fetch("https://etiketa-backend.onrender.com/usuarios/crear-usuario", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(datos),
      });

      const resultado = await respuesta.json();
      console.log("Registro:", resultado);
      alert("Usuario registrado correctamente");
    } catch (error) {
      console.error("Error en registro:", error);
      alert("Error al registrarse");
    }
  };

  return (
    <div className="mobile-wrapper">
      <div className="pagina-acceso">
        <FormularioRegistro onRegistro={manejarRegistro} />
      </div>
    </div>
  );
};

export default PaginaRegistro;

