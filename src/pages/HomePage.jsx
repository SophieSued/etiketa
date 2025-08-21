import React from "react";
import HeaderHome from "../components/HeaderHome";
import SearchBar from "../components/SearchBar";
import FiltrosRapidos from "../components/FiltrosRapidos";
import EstadisticasBox from "../components/EstadisticasBox";
import ListaProductos from "../components/ListaProductos";
import BarraFooter from "../components/BarraFooter";
import "../styles/HomePage.css";

export default function HomePage() {
  return (
    <div className="homepage app">
      <div className="homepage__content">
        <HeaderHome />
        <SearchBar />
        <FiltrosRapidos />
        <EstadisticasBox />

        <section className="section section--recientes">
          <h3>Recientes ➤</h3>
          <ListaProductos tipo="recientes" />
        </section>

        <section className="section section--favoritos">
          <h3>Favoritos ☆</h3>
          <ListaProductos tipo="favoritos" />
        </section>
      </div>

      {/* Footer fijo */}
      <div className="homepage__nav">
        <BarraFooter />
      </div>
    </div>
  );
}
