import React,{useState, useEffect} from "react";
import axios from "axios";
import HomeArtistaItem from "../componentes/items/homeArtistaItem";
import HomeLanzamientoItem from "../componentes/items/homeLanzamientoItem";

const HomePage = (props) => {
  const [loading, setLoading] = useState(false);
  const [lanzamientos, setLanzamiento] = useState([]);  
  const [artistas, setArtistas] = useState([]);  

  useEffect(() => {
    const cargarLanzamiento = async () => {
      setLoading(true);
      const response = await axios.get("http://localhost:3000/api/lanzamientostop");
      setLanzamiento(response.data);
      setLoading(false);
    };
    
    const cargarArtistas = async () => {
        setLoading(true);
        const response = await axios.get("http://localhost:3000/api/artistastop");
        setArtistas(response.data);
        setLoading(false);
    };

    cargarLanzamiento();
    cargarArtistas();
  }, []);


  return (
    <main>
      <section>
        <h2>Nuevos lanzamientos</h2>
        <ul>
          {loading ? (<p>Cargando...</p>) : 
          (
            lanzamientos.map((item) => (
              <HomeLanzamientoItem
                key={item.id}
                nombre={item.nombre}
                descripcion={item.descripcion}
                genero={item.generoNombre}
                artista={item.artistaNombre}
                imagen={item.imagen}
                body={item.cuerpo}
              />
            ))
          )}
        </ul>
      </section>
      <section>
        <h2>Artistas emergentes</h2>
        <ul>
          {loading ? (<p>Cargando...</p>) : 
          (
            artistas.map((item) => (
              <HomeArtistaItem
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
