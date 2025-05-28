import React from "react";
import BarcodeScanner from "../components/BarcodeScanner";
import "../styles/ScanPage.css";

const ScanPage = () => {
  return (
    <div className="scan-container">
      <h1>Escanear Producto</h1>
      <BarcodeScanner />
    </div>
  );
};

export default ScanPage;
