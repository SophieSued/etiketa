import React from "react";

export default function SearchBar({ placeholder = "Busca..." }) {
  return (
    <div className="home__search">
      <input placeholder={placeholder} />
    </div>
  );
}
