import React from "react";
import BarcodeScanner from "../components/BarcodeScanner";

const ScanPage = () => {
  return (
    <div>
      <h1>Escanear producto</h1>
      <BarcodeScanner />
    </div>
  );
};

export default ScanPage;