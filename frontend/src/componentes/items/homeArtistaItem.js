import React from "react";

const HomeArtistasItem = (props) => {
  const { nombre, descripcion, imagen, body } = props;

  return (
    <li>
      <h3>{nombre}</h3>
      <img src={imagen} alt="artista {nombre}" />
      <p>{descripcion}</p>
    </li>
  );
};

export default HomeArtistasItem;
