import React from "react";
import { FiInfo } from "react-icons/fi";

export default function HeaderHome() {
  return (
    <header className="home__header">
      <h1 className="home__title">Etiketa</h1>
      <button className="icon-btn" aria-label="Información">
        <FiInfo />
      </button>
    </header>
  );
}
