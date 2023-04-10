import React from "react";

const HomePage = (props) => {
    return (
        <main>
            <section id="lanzamientos">
                <h2>Lanzamientos</h2>
                <ul>
                    <li>
                        <img src="img/lanzamiento/lanzamientos (1).png" alt="Lanzamiento 1" />
                        <h3>Canción 1</h3>
                        <p>Artista 1</p>
                        <a href="#" class="btn">Escuchar</a>
                    </li>
                    <li>
                        <img src="img/lanzamiento/lanzamientos (2).png" alt="Lanzamiento 2" />
                        <h3>Canción 2</h3>
                        <p>Artista 2</p>
                        <a href="#" class="btn">Escuchar</a>
                    </li>
                    <li>
                        <img src="img/lanzamiento/lanzamientos (3).png" alt="Lanzamiento 3" />
                        <h3>Canción 3</h3>
                        <p>Artista 3</p>
                        <a href="#" class="btn">Escuchar</a>
                    </li>
                </ul>
            </section>
        </main>
    )
}

export default HomePage;