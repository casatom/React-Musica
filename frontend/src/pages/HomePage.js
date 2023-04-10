import React from "react";

const HomePage = (props) => {
    return (
        <main>
            <section>
                <h2>Nuevos lanzamientos</h2>

                <ul>
                    <li>
                        <h3>Canción 1</h3>
                        <img src="img/sencillos/sencillos (1).png" alt="cancion 1" />
                        <p>Descripción de la canción 1</p>
                    </li>
                    <li>
                        <h3>Canción 2</h3>
                        <img src="img/sencillos/sencillos (2).png" alt="cancion 2" />
                        <p>Descripción de la canción 2</p>
                    </li>
                    <li>
                        <h3>Canción 3</h3>
                        <img src="img/sencillos/sencillos (3).png" alt="cancion 3" />
                        <p>Descripción de la canción 3</p>
                    </li>
                </ul>
            </section>
            <section>
                <h2>Artistas emergentes</h2>
                <ul>
                    <li>
                        <h3>Artista 1</h3>
                        <img src="img/artista/artista 1.png" alt="artista 1" />
                        <p>Descripción del artista 1</p>
                    </li>
                    <li>
                        <h3>Artista 2</h3>
                        <img src="img/artista/artista 2.png" alt="artista 2" />
                        <p>Descripción del artista 2</p>
                    </li>
                    <li>
                        <h3>Artista 3</h3>
                        <img src="img/artista/artista 3.png" alt="artista 3" />
                        <p>Descripción del artista 3</p>
                    </li>
                </ul>
            </section>
        </main>
    )
}

export default HomePage;