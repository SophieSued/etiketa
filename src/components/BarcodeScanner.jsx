import React, { useEffect, useRef, useState } from "react";
import { BrowserMultiFormatReader } from "@zxing/browser";
import "../styles/BarcodeScanner.css";

const BarcodeScanner = () => {
  const videoRef = useRef(null);
  const codeReader = useRef(null);
  const [code, setCode] = useState("");
  const [isScanning, setIsScanning] = useState(true);

  useEffect(() => {
    const startScanner = async () => {
      try {
        const devices = await BrowserMultiFormatReader.listVideoInputDevices();
        if (!devices.length) {
          console.error("No hay cámaras disponibles.");
          return;
        }

        const selectedDeviceId =
          devices.find((device) =>
            device.label.toLowerCase().includes("back")
          )?.deviceId || devices[1]?.deviceId || devices[0]?.deviceId;

        codeReader.current = new BrowserMultiFormatReader();

        if (isScanning) {
          codeReader.current.decodeFromVideoDevice(
            selectedDeviceId,
            videoRef.current,
            (result) => {
              if (result) {
                const text = result.getText();
                setCode(text);
                setIsScanning(false);
                console.log("Código detectado:", text);

                fetch(`https://etiketa-backend.onrender.com/buscar-producto/${text}`)
                  .then((res) => {
                    if (!res.ok) {
                      throw new Error(`Producto no encontrado: ${res.status}`);
                    }
                    return res.json();
                  })
                  .then((data) => {
                    console.log("Producto desde backend:", data);
                  })
                  .catch((err) => {
                    console.error("Error al conectar con backend:", err);
                  });
              }
            }
          );
        }
      } catch (err) {
        console.error("Error al iniciar escáner:", err);
      }
    };

    startScanner();

    return () => {
      if (codeReader.current && typeof codeReader.current.reset === "function") {
        codeReader.current.reset();
      }
    };
  }, [isScanning]);

  const manejarNuevoEscaneo = () => {
    setCode("");
    setIsScanning(true);
  };

  return (
    <div className="scanner-container">
      
      <div className="corner top-left"></div>
      <div className="corner top-right"></div>
      <div className="corner bottom-left"></div>
      <div className="corner bottom-right"></div>

     
      <video
        ref={videoRef}
        className="qr-video"
        muted
        playsInline
        autoPlay
      />

      
      {code && (
        <>
          <p className="codigo-detectado">Código detectado: {code}</p>
          <div className="boton-reiniciar">
            <button onClick={manejarNuevoEscaneo}>Escanear otro</button>
          </div>
        </>
      )}
    </div>
  );
};

export default BarcodeScanner;
