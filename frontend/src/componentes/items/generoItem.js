import React from "react";

const GeneroItem = (props) => {
  const { nombre, descripcion, imagen, body } = props;

  return (
    <li>
      <img src={imagen} alt="{{nombre}}" />
      <div>
        <h3>{nombre}</h3>
        <p>{descripcion}</p>
      </div>
      <div dangerouslySetInnerHTML={{ __html: body }} />
    </li>
  );
};

export default GeneroItem;
