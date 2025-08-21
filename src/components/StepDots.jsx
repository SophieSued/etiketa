import { useLocation } from "react-router-dom";

export default function StepDots() {
  const { pathname } = useLocation();
  
  const isStep0 = pathname.startsWith("/login") || pathname.startsWith("/registro");
  const isStep1 = pathname.startsWith("/filtros");

  return (
    <div className="steps">
      <span className={`dot ${isStep0 ? "active" : ""}`} aria-label="Paso 1" />
      <span className={`dot ${isStep1 ? "active" : ""}`} aria-label="Paso 2" />
    </div>
  );
}
