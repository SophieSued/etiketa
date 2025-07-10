import React from "react";
import FormularioLogin from "../components/FormularioLogin";
import FormularioRegistro from "../components/FormularioRegistro";
import "../styles/Formularios.css";

const PaginaAcceso = () => {
  const manejarLogin = async (datos) => {
    try {
      const respuesta = await fetch("https://tu-backend.com/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(datos),
      });

      const resultado = await respuesta.json();
      console.log("Login exitoso:", resultado);

      if (resultado.token) {
        localStorage.setItem("token", resultado.token);
        alert("Login exitoso");
       
      } else {
        alert("Login fallido");
      }
    } catch (error) {
      console.error("Error al hacer login:", error);
      alert("Ocurrió un error");
    }
  };


  const manejarRegistro = async (datos) => {
    try {
      const respuesta = await fetch("https://tu-backend.com/api/registro", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(datos),
      });

      const resultado = await respuesta.json();
      console.log("Registro exitoso:", resultado);

      alert("Usuario registrado correctamente");
    } catch (error) {
      console.error("Error al registrar:", error);
      alert("Ocurrió un error al registrar");
    }
  };

  return (
    <div className="pagina-acceso">
      <FormularioLogin onLogin={manejarLogin} />
      <FormularioRegistro onRegistro={manejarRegistro} />
    </div>
  );
};

export default PaginaAcceso;
