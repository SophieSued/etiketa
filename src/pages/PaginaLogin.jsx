import React from "react";
import FormularioLogin from "../components/FormularioLogin";
import "../styles/Formularios.css";

const PaginaLogin = () => {
  const manejarLogin = async (datos) => {
    try {
        const respuesta = await fetch("https://etiketa-backend.onrender.com/usuarios/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(datos),
      });

      const resultado = await respuesta.json();
      console.log("Login:", resultado);

      if (resultado.token) {
        localStorage.setItem("token", resultado.token);
        alert("Inicio de sesión exitoso");
      } else {
        alert("Credenciales incorrectas");
      }
    } catch (error) {
      console.error("Error en login:", error);
      alert("Error al iniciar sesión");
    }
  };

  return (
    <div className="mobile-wrapper">
      <div className="pagina-acceso">
        <FormularioLogin onLogin={manejarLogin} />
      </div>
    </div>
  );
};

export default PaginaLogin;
