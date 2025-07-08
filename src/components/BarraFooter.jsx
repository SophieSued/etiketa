import React from "react";
import "../styles/BarraFooter.css";
import { Link } from "react-router-dom";
import { IoIosSettings } from "react-icons/io";
import { MdOutlineCompareArrows, MdQrCodeScanner } from "react-icons/md";
import { AiFillHome } from "react-icons/ai";
import { FaLayerGroup } from "react-icons/fa6";

const BarraFooter = () => {
  return (
    <footer className="barra-footer">
      <nav>
        <ul>
          <li>
            <Link to="/">
              <AiFillHome size={22} />
              <span>Inicio</span>
            </Link>
          </li>
          <li>
            <Link to="/comparar">
              <MdOutlineCompareArrows size={22} />
              <span>Comparar</span>
            </Link>
          </li>
          <li>
            <Link to="/scan">
              <MdQrCodeScanner size={22} />
              <span>Escanea</span>
            </Link>
          </li>
          <li>
            <Link to="/explora">
              <FaLayerGroup size={22} />
              <span>Explora</span>
            </Link>
          </li>
          <li>
            <Link to="/ajustes">
              <IoIosSettings size={22} />
              <span>Ajustes</span>
            </Link>
          </li>
        </ul>
      </nav>
    </footer>
  );
};

export default BarraFooter;
