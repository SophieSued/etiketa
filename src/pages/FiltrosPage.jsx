import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import StepDots from "../components/StepDots";
import "../styles/Formularios.css";


const API_BASE = (import.meta.env.VITE_API_BASE ?? "https://etiketa-backend.onrender.com").replace(/\/+$/, "");
const ENDPOINT_CREAR_USUARIO = "/usuarios/crear-usuario";

const FiltrosPage = () => {
  
  const opciones = useMemo(() => ["Celiaquía", "Vegano/a"], []);

  const [seleccionados, setSeleccionados] = useState([]);
  const [alergiasTxt, setAlergiasTxt] = useState("");
  const [otraRestriccion, setOtraRestriccion] = useState(""); 
  const [enviando, setEnviando] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  
  const registro =
    (location.state && location.state.registro) ||
    JSON.parse(localStorage.getItem("registroPendiente") || "null");

  
  useEffect(() => {
    const reg = location.state && location.state.registro;
    if (reg) {
      localStorage.setItem("registroPendiente", JSON.stringify(reg));
    }
  }, [location.state]);

  const toggleSeleccion = (opcion) => {
    setSeleccionados((prev) =>
      prev.includes(opcion) ? prev.filter((o) => o !== opcion) : [...prev, opcion]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!registro) {
      navigate("/registro");
      return;
    }
    if (enviando) return;

  
    const vegano = seleccionados.includes("Vegano/a");
    const celiaquia = seleccionados.includes("Celiaquía");

   
    const payload = {
      nombre: registro.nombre,
      apellido: registro.apellido,
      email: registro.email,
      password: registro.password, 
      edad: registro.edad ?? null,
      vegano,
      celiaquia,
      enfermedades: (otraRestriccion || "").trim(), 
      alergias: (alergiasTxt || "").trim(),
    };

    try {
      setEnviando(true);

      const res = await fetch(`${API_BASE}${ENDPOINT_CREAR_USUARIO}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        let msg = `Error ${res.status}`;
        try {
          const ct = res.headers.get("content-type") || "";
          if (ct.includes("application/json")) {
            const j = await res.json();
            msg = j?.message || j?.error || msg;
          } else {
            const t = await res.text();
            msg = t || msg;
          }
        } catch {}
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

 
  if (!registro) return null;

  return (
    <div className="auth-page">
      <div className="logo-container">
        <img src="/Logo chico (1).png" alt="Logo Etiketa" className="logo" />
      </div>

      <StepDots />

      {

      }
      <form className="formulario formulario--filtros" onSubmit={handleSubmit}>
        <h2 style={{ textAlign: "left" }}>Personalizá tu experiencia</h2>
        <p style={{ marginTop: 0, color: "var(--c-muted)", textAlign: "left" }}>
          Seleccioná si sos celíaca/o o vegana/o y contanos alergias u otras restricciones.
        </p>

        {

        }
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

        {

        }
        <label className="flex flex-col" style={{ marginTop: 12 }}>
          <span>Alergias</span>
          <input
            type="text"
            placeholder="Ej: maní, lácteos…"
            value={alergiasTxt}
            onChange={(e) => setAlergiasTxt(e.target.value)}
            maxLength={255}
          />
        </label>

        {

        }
        <label className="flex flex-col" style={{ marginTop: 12 }}>
          <span>Otra restricción (dermatológica)</span>
          <input
            type="text"
            placeholder="Ej: dermatitis, rosácea…"
            value={otraRestriccion}
            onChange={(e) => setOtraRestriccion(e.target.value)}
            maxLength={255}
          />
        </label>

        {error && <small className="error">{error}</small>}

        <button type="submit" className="submit-btn" disabled={enviando}>
          {enviando ? "Creando cuenta..." : "Crear cuenta"}
        </button>
      </form>
    </div>
  );
};

export default FiltrosPage;

