import React from "react";
import FormularioRegistro from "../components/FormularioRegistro";
import "../styles/Formularios.css";

const PaginaRegistro = () => {
  const manejarRegistro = async (datos) => {
    try {
      console.log("Datos a enviar:", datos); 

      const respuesta = await fetch("https://etiketa-backend.onrender.com/usuarios/crear-usuario", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombre: datos.nombre,     
          apellido: datos.apellido, 
          email: datos.email,
          password: datos.password,
        }),
      });

      const resultado = await respuesta.json();
      console.log("Registro:", resultado);

      if (resultado.token) {
        localStorage.setItem("token", resultado.token);
        alert("Registro exitoso");
        window.location.href = "/login";
      } else {
        alert("Error al registrarse: " + (resultado.message || "Intentalo de nuevo"));
      }
    } catch (error) {
      console.error("Error en el registro:", error);
      alert("Error al registrar el usuario");
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



