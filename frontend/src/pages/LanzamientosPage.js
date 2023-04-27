import React, { useState, useEffect } from "react";
import axios from "axios";
import LanzamientoItem from "../componentes/items/lanzamientoItem";

const LanzamientosPage = (props) => {
  const [loading, setLoading] = useState(false);
  const [lanzamientos, setLanzamiento] = useState([]);

  useEffect(() => {
    const cargarLanzamiento = async () => {
      setLoading(true);
      const response = await axios.get("http://localhost:3000/api/lanzamientos");
      setLanzamiento(response.data);
      setLoading(false);
    };
    cargarLanzamiento();
  }, []);

  return (
    <main>
      <section id="lanzamientos">
        <h2>Lanzamientos</h2>
        <ul>
          {loading ? (
            <p>Cargando...</p>
          ) : (
            lanzamientos.map((item) => (
              <LanzamientoItem
                key={item.id}
                nombre={item.nombre}
                descripcion={item.descripcion}
                genero = {item.generoNombre}
                artista = {item.artistaNombre}
                imagen={item.imagen}
                body={item.cuerpo}
              />
            ))
          )}
        </ul>
      </section>
    </main>
  );
};

export default LanzamientosPage;
