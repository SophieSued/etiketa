import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import BienvenidoPage from "./pages/BienvenidoPage"; // pantalla de bienvenida
import HomePage from "./pages/HomePage";             // home real de la app
import PaginaLogin from "./pages/PaginaLogin";
import PaginaRegistro from "./pages/PaginaRegistro";
import FiltrosPage from "./pages/FiltrosPage";       // 👈 importa el nuevo archivo
import ScanPage from "./pages/ScanPage";
import ResultPage from "./pages/ResultPage";

function App() {
  return (
    <Router>
      <Routes>
        {/* Bienvenida */}
        <Route path="/" element={<BienvenidoPage />} />

        {/* Home de la app */}
        <Route path="/inicio" element={<HomePage />} />

        {/* Otras pantallas */}
        <Route path="/login" element={<PaginaLogin />} />
        <Route path="/registro" element={<PaginaRegistro />} />
        <Route path="/filtros" element={<FiltrosPage />} />
        <Route path="/scan" element={<ScanPage />} />
        <Route path="/resultado" element={<ResultPage />} />
      </Routes>
    </Router>
  );
}

export default App;




