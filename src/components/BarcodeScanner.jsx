import React, { useEffect, useRef, useState } from "react";
import { BrowserMultiFormatReader } from "@zxing/browser";

const BarcodeScanner = () => {
  const videoRef = useRef(null);
  const codeReader = useRef(null);
  const [code, setCode] = useState("");

  useEffect(() => {
    const startScanner = async () => {
      try {
        const devices = await BrowserMultiFormatReader.listVideoInputDevices();
        console.log("Cámaras disponibles:", devices);

        if (!devices.length) {
          console.error("No hay cámaras disponibles.");
          return;
        }

        // Elegir cámara trasera si existe
        const selectedDeviceId =
          devices.find((device) =>
            device.label.toLowerCase().includes("back")
          )?.deviceId || devices[1]?.deviceId || devices[0]?.deviceId;

        codeReader.current = new BrowserMultiFormatReader();

        codeReader.current.decodeFromVideoDevice(
          selectedDeviceId,
          videoRef.current,
          (result, err) => {
            if (result) {
              const text = result.getText();
              setCode(text); // Mostrar en pantalla
              console.log("Código detectado:", text);
            }

            // Ignorar errores normales cuando no detecta código
            if (err && err.name !== "NotFoundException") {
              console.error("Error escaneando:", err);
            }
          }
        );
      } catch (err) {
        console.error("Error al iniciar escáner:", err);
      }
    };

    startScanner();

    // Limpiar al salir
    return () => {
      if (codeReader.current) {
        codeReader.current.reset();
      }
    };
  }, []);

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
      )}
    </div>
  );
};

export default BarcodeScanner;
