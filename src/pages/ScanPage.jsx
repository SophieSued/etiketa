import React from "react";
import TituloProyecto from "../components/TituloProyecto";
import BarcodeScanner from "../components/BarcodeScanner";
import BotonesEscaneo from "../components/BotonesEscaneo";
import BarraFooter from "../components/BarraFooter";
import "../styles/ScanPage.css";

const ScanPage = () => {
  return (
    <div className="mobile-wrapper"> 
      <div className="scan-container">
        <TituloProyecto />

        <div className="scanner-box">
          <BarcodeScanner />
          <p className="texto-ayuda">Apunta al código de barra con la cámara</p>
        </div>

        <BotonesEscaneo />
      </div>

      <BarraFooter />
    </div>
  );
};

export default ScanPage;


