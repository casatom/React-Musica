import React, { useState, useEffect } from "react";
import axios from "axios";
import GeneroItem from "../componentes/items/generoItem";

const HomePage = (props) => {
  const [loading, setLoading] = useState(false);
  const [generos, setGeneros] = useState([]);

  useEffect(() => {
    const cargarGeneros = async () => {
      setLoading(true);
      const response = await axios.get("http://localhost:3000/api/generos");
      setGeneros(response.data);
      setLoading(false);
    };
    cargarGeneros();
  }, []);

  return (
    <main>
      <section id="generos">
        <h2>Géneros</h2>
        <ul>
          {loading ? (
            <p>Cargando...</p>
          ) : (
            generos.map((item) => (
              <GeneroItem
                key={item.id}
                nombre={item.nombre}
                descripcion={item.descripcion}
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

export default HomePage;
