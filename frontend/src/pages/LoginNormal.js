import React from "react";

const LoginNormal = (props) => {
    return (
        <main>
            <form className="login-form">
                <h2>Iniciar sesión como usuario</h2>
                <label for="username">Nombre de usuario:</label>
                <input type="text" id="username" name="username" required />
                <label for="password">Contraseña:</label>
                <input type="password" id="password" name="password" required />
                <button type="submit">Ingresar</button>
            </form>
        </main>
    )
}

export default LoginNormal;