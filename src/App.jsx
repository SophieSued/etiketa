import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ScanPage from "./pages/ScanPage";
import ResultPage from "./pages/ResultPage"; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/scan" element={<ScanPage />} />
        <Route path="/resultado" element={<ResultPage />} /> {}
      </Routes>
    </Router>
  );
}

export default App;
