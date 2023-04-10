import React from 'react';
import { Link } from 'react-router-dom';

const Header = (props) => {
    return (
        <header>
            <div>
                <Link to="/" style={{ color: 'inherit', textDecoration: 'inherit'}}>
                    <div className="holder">
                        <img src="img/logo.png" width="100" alt="Meta-icon" />
                        <h1 className='home'>Mesa.com</h1>
                    </div>
                </Link>
            </div>
            <nav>
                <ul>

                    <li><Link to="/">Inicio</Link></li>
                    <li><Link to="/generos">Géneros</Link></li>
                    <li><Link to="/lanzamientos">Nuevos lanzamientos</Link></li>
                    <li><Link to="/nuevosartistas">Artistas emergentes</Link></li>
                    <li><Link to="/contacto">Contacto</Link></li>
                </ul>
            </nav>
        </header>
    )
}

export default Header;