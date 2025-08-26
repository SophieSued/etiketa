import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import StepDots from "../components/StepDots";
import "../styles/Formularios.css";

// Backend en Render (SIN barra final) y endpoint
const API_BASE = "https://etiketa-backend.onrender.com";
const ENDPOINT_CREAR_USUARIO = "/usuarios/crear-usuario";

const FiltrosPage = () => {
  const opciones = useMemo(
    () => ["Celiaquía", "Vegano/a", "Alergía", "Otra restricción"],
    []
  );

  const [seleccionados, setSeleccionados] = useState([]);
  const [enviando, setEnviando] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  // Recuperar datos del paso anterior, con fallback a localStorage
  const registro =
    location.state?.registro ||
    JSON.parse(localStorage.getItem("registroPendiente") || "null");

  useEffect(() => {
    if (location.state?.registro) {
      localStorage.setItem(
        "registroPendiente",
        JSON.stringify(location.state.registro)
      );
    }
  }, [location.state]);

  const toggleSeleccion = (opcion) => {
    setSeleccionados((prev) =>
      prev.includes(opcion)
        ? prev.filter((o) => o !== opcion)
        : [...prev, opcion]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!registro) {
      navigate("/registro");
      return;
    }

    const payload = { ...registro, filtros: seleccionados };

    try {
      setEnviando(true);

      const res = await fetch(`${API_BASE}${ENDPOINT_CREAR_USUARIO}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // credentials: "include", // descomentar si tu backend usa cookies/sesión y CORS lo permite
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const msg = await res.text().catch(() => "Error de registro");
        throw new Error(msg);
      }

      localStorage.removeItem("registroPendiente");
      navigate("/inicio");
    } catch (err) {
      console.error(err);
      setError(err?.message || "No se pudo crear la cuenta. Intentalo nuevamente.");
    } finally {
      setEnviando(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="logo-container">
        <img src="/Logo chico (1).png" alt="Logo Etiketa" className="logo" />
      </div>

      <StepDots />

      <form className="formulario formulario--registro" onSubmit={handleSubmit}>
        <h2 style={{ textAlign: "left" }}>Personaliza tu experiencia</h2>
        <p style={{ marginTop: 0, color: "var(--c-muted)", textAlign: "left" }}>
          Seleccioná las restricciones que tenés
          <br />
          para recibir recomendaciones más precisas.
        </p>

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

        {error && <small className="error">{error}</small>}

        <button type="submit" className="submit-btn" disabled={enviando}>
          {enviando ? "Creando cuenta..." : "Crear cuenta"}
        </button>
      </form>
    </div>
  );
};

export default FiltrosPage;






