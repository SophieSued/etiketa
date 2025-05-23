import React, { useEffect, useRef } from "react";
import { BrowserMultiFormatReader } from "@zxing/browser";

const BarcodeScanner = () => {
  const videoRef = useRef(null);
  const codeReader = useRef(null);

  useEffect(() => {
    const startScanner = async () => {
      try {
        const devices = await BrowserMultiFormatReader.listVideoInputDevices();
        console.log("Cámaras disponibles:", devices);

        if (!devices.length) {
          console.error("No hay cámaras disponibles.");
          return;
        }

        const selectedDeviceId =
  devices.find((device) => device.label.toLowerCase().includes("back"))?.deviceId ||
  devices[1]?.deviceId ||
  devices[0]?.deviceId;

        codeReader.current = new BrowserMultiFormatReader();

        codeReader.current.decodeFromVideoDevice(
          selectedDeviceId,
          videoRef.current,
          (result, err) => {
            if (result) {
              console.log("Código detectado:", result.getText());
            }
            if (err && !(err instanceof DOMException)) {
              console.error("Error escaneando:", err);
            }
          }
        );
      } catch (err) {
        console.error("Error al iniciar escáner:", err);
      }
    };

    startScanner();

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
        style={{ width: "100%", border: "2px solid gray" }}
        muted
        playsInline
        autoPlay
      />
    </div>
  );
};

export default BarcodeScanner;
