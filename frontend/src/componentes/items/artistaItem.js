import React  from "react";

const ArtistasItem = (props) => {

    const { nombre,descripcion,imagen,body } =props;

    return(
        <div className="artista">
            <img src={imagen} alt="Artista {{nombre}}" />
            <h3>{nombre}</h3>
            <p>{descripcion}</p>
            <div dangerouslySetInnerHTML={{ __html:body}} />
        
        </div>
    );

}

export default ArtistasItem;