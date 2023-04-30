import React from "react";
import Reproductor from "../js/reproductor";

const LanzamientoItem = (props) => {
  const {id,nombre,audio, descripcion, genero, artista, imagen, body } = props;

  const reproductor = "reproductor"+ id;
  
  /*
  const play = "play("+ id + ")";
  const pause = "pause("+ id + ")";
  const stop = "stop("+ id + ")";
  */

  return (
    <li>
      <img src={imagen} alt="Lanzamiento {nombre}" />
      <h3>{nombre}</h3>
      <h5>{artista}</h5>
      <p>{genero}</p>

      <audio hidden id={reproductor} controls>
        <source src={audio}/>
      </audio>

      <Reproductor index= {id}/>

      <div dangerouslySetInnerHTML={{ __html:body}} />
    </li>
  );
};

export default LanzamientoItem;
