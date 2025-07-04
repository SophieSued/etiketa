// src/components/BarraFooterScan.jsx
import React from "react";
import "../styles/BarraFooterScan.css";
import { IoIosSettings } from "react-icons/io";
import { MdOutlineCompareArrows, MdQrCodeScanner } from "react-icons/md";
import { AiFillHome } from "react-icons/ai";
import { FaLayerGroup } from "react-icons/fa6";

const BarraFooterScan = () => {
  return (
    <footer className="barra-footer-scan">
      <nav>
        <ul>
          <li>
            <AiFillHome size={22} />
            <span>Inicio</span>
          </li>
          <li>
            <MdOutlineCompareArrows size={22} />
            <span>Comparar</span>
          </li>
          <li>
            <MdQrCodeScanner size={22} />
            <span>Escanea</span>
          </li>
          <li>
            <FaLayerGroup size={22} />
            <span>Explora</span>
          </li>
          <li>
            <IoIosSettings size={22} />
            <span>Ajustes</span>
          </li>
        </ul>
      </nav>
    </footer>
  );
};

export default BarraFooterScan;

