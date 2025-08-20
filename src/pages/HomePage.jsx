import React from "react";
import HeaderHome from "../components/HeaderHome";
import SearchBar from "../components/SearchBar";
import FiltrosRapidos from "../components/FiltrosRapidos";
import EstadisticasBox from "../components/EstadisticasBox";
import ListaProductos from "../components/ListaProductos";
import BarraFooter from "../components/BarraFooter";

const HomePage = () => {
  return (
    <div className="homepage">
      <HeaderHome />
      <SearchBar />
      <FiltrosRapidos />
      <EstadisticasBox />

      <h3>Recientes ➤</h3>
      <ListaProductos tipo="recientes" />

      <h3>Favoritos ☆</h3>
      <ListaProductos tipo="favoritos" />

      <BarraFooter />
    </div>
  );
};

export default HomePage;
