import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import BienvenidoPage from "./pages/BienvenidoPage";
import HomePage from "./pages/HomePage";
import PaginaLogin from "./pages/PaginaLogin";
import PaginaRegistro from "./pages/PaginaRegistro";
import FiltrosPage from "./pages/FiltrosPage";
import ScanPage from "./pages/ScanPage";
import ResultPage from "./pages/ResultPage";
import PantallaCargando from "./components/PantallaCargando";
import ExploraPage from "./pages/ExploraPage"; // <-- IMPORTANTE

import { AuthProvider } from "./AuthContext";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<BienvenidoPage />} />
          <Route path="/login" element={<PaginaLogin />} />
          <Route path="/registro" element={<PaginaRegistro />} />
          <Route path="/filtros" element={<FiltrosPage />} />
          <Route path="/cargando" element={<PantallaCargando />} />

          {/* NUEVA RUTA */}
          <Route
            path="/explora"
            element={
              <ProtectedRoute>
                <ExploraPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/inicio"
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/scan"
            element={
              <ProtectedRoute>
                <ScanPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/resultado"
            element={
              <ProtectedRoute>
                <ResultPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App; // <-- AHORA SÍ
