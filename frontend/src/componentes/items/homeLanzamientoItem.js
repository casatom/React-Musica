import React from "react";

const HomeLanzamientoItem = (props) => {
  const { nombre, descripcion, genero, artista, imagen, body } = props;

  return (
    <li>
      <h3>{nombre}</h3>
      <img src={imagen} alt="cancion {nombre}" />
      <p>{descripcion}</p>
    </li>
  );
};

export default HomeLanzamientoItem;
