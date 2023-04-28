import React from "react";

const LanzamientoItem = (props) => {
  const { nombre, descripcion, genero, artista, imagen, body } = props;

  return (
    <li>
      <img src={imagen} alt="Lanzamiento {nombre}" />
      <h3>{nombre}</h3>
      <h5>{artista}</h5>
      <p>{genero}</p>
      <a href="#" class="btn-escuchar">Escuchar</a>

      <div dangerouslySetInnerHTML={{ __html:body}} />
    </li>
  );
};

export default LanzamientoItem;
