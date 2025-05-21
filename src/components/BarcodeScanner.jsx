import React, { useEffect, useRef } from "react";
import { BrowserMultiFormatReader } from "@zxing/browser";

const BarcodeScanner = () => {
  const videoRef = useRef(null); // Guarda referencia al <video>

  useEffect(() => {
    const codeReader = new BrowserMultiFormatReader(); // Crea lector de códigos

    // Inicia la cámara y escanea en vivo
    codeReader.decodeFromVideoDevice(null, videoRef.current, (result) => {
      if (result) {
        console.log("Código detectado:", result.getText());
        // En el futuro podrías guardar el resultado o enviarlo a otro lado
      }
    });

    // Limpia al salir del componente (detiene cámara)
    return () => {
      codeReader.reset();
    };
  }, []);

  return (
    <div>
      <video
        ref={videoRef}
        style={{ width: "100%" }}
        muted
        playsInline
      />
    </div>
  );
};

export default BarcodeScanner;


