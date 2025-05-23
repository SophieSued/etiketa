import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ScanPage from "./pages/ScanPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/scan" element={<ScanPage />} />
      </Routes>
    </Router>
  );
}

export default App;

