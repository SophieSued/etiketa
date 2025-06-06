import React from "react";
import { PiRadioButtonThin } from "react-icons/pi";
import { IoFlashOutline } from "react-icons/io5";
import { CiImageOn } from "react-icons/ci";
import "../styles/BotonesEscaneo.css";


const BotonesEscaneo = () => {
  return (
    <div className="botones-escaneo">
      <button className="boton-icono">
        <CiImageOn size={50} />
      </button>
      <button className="boton-icono">
        <PiRadioButtonThin size={90} />
      </button>
      <button className="boton-icono">
        <IoFlashOutline size={50} />
      </button>
    </div>
  );
};

export default BotonesEscaneo;
