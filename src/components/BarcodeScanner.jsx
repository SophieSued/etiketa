import React, { useEffect, useRef, useState } from "react";
import { BrowserMultiFormatReader } from "@zxing/browser";

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

                // CONSULTA BACKEND
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
    <div>
      <video
        ref={videoRef}
        style={{ width: "100%", border: "2px solid gray", borderRadius: "12px" }}
        muted
        playsInline
        autoPlay
      />

      {code && (
        <>
          <p
            style={{
              marginTop: "16px",
              color: "green",
              textAlign: "center",
              fontWeight: "bold",
              fontSize: "18px",
            }}
          >
            Código detectado: {code}
          </p>
          <div style={{ display: "flex", justifyContent: "center", marginTop: "12px" }}>
            <button
              onClick={manejarNuevoEscaneo}
              style={{
                padding: "10px 16px",
                borderRadius: "8px",
                backgroundColor: "#007bff",
                color: "white",
                border: "none",
                fontWeight: "bold",
                cursor: "pointer"
              }}
            >
              Escanear otro
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default BarcodeScanner;
