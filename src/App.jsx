import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ScanPage from "./pages/ScanPage";
import ResultPage from "./pages/ResultPage";
import PaginaInicial from "./pages/PaginaInicio"; 
import PaginaLogin from "./pages/PaginaLogin";
import PaginaRegistro from "./pages/PaginaRegistro";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PaginaInicial />} />
        <Route path="/login" element={<PaginaLogin />} />
        <Route path="/registro" element={<PaginaRegistro />} />
        <Route path="/scan" element={<ScanPage />} />
        <Route path="/resultado" element={<ResultPage />} />
      </Routes>
    </Router>
  );
}

export default App;


