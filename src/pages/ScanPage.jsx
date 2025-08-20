import React from "react";
import TituloProyecto from "../components/TituloProyecto";
import BarcodeScanner from "../components/BarcodeScanner";
import InfoEscaneo from "../components/InfoEscaneo";
import BarraFooterScan from "../components/BarraFooterScan";
import "../styles/ScanPage.css";

const ScanPage = () => {
  return (
    <div className="mobile-wrapper">
      <div className="scan-contenido">
        <div className="scan-container">
          <TituloProyecto />
          <div className="scanner-box">
            <BarcodeScanner />
            <p className="texto-ayuda">Apunta al código de barra con la cámara</p>
          </div>
        </div>

        <InfoEscaneo />
      </div>

      <BarraFooterScan />
    </div>
  );
};

export default ScanPage;
