import React,{useState, useEffect} from "react";
import axios from 'axios'
import ArtistasItem from "../componentes/items/artistaItem";

const ArtistasNuevosPage = (props) => {
    const [loading , setLoading] = useState(false);
    const [artistas, setArtistas] =useState([]);
    
    useEffect(() =>{
        const cargarArtistas = async () =>{
            setLoading(true);
            const response = await axios.get('http://localhost:3000/api/artistas');
            setArtistas(response.data);
            setLoading(false)
        };
        cargarArtistas();
    }, []);
    
    return (
        <main>
            <h2 className="titulo-artista-emergente">Artistas Emergentes</h2>
            <section id="artistas-emergentes">
            {loading ? (<p>Cargando...</p>):

            (
                artistas.map(item =>
                    < ArtistasItem 
                        key={item.id} 
                        nombre = {item.nombre}
                        descripcion = {item.descripcion}
                        imagen = {item.imagen}
                        body ={item.cuerpo}/>)
            )}
            </section>
        </main>
    )
}

export default ArtistasNuevosPage;