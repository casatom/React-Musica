import React from "react";

const ContactoPage = (props) => {
    return (
        <main>
            <section id="contacto">
                <h2>Contacto</h2>
                <form>
                    <div>
                        <label for="nombre">Nombre:</label>
                        <input type="text" id="nombre" name="nombre" required />
                    </div>
                    <div>
                        <label for="correo">Correo electrónico:</label>
                        <input type="email" id="correo" name="correo" required />
                    </div>
                    <div>
                        <label for="mensaje">Mensaje:</label>
                        <textarea id="mensaje" name="mensaje" required></textarea>
                    </div>
                    <button type="submit" class="btn">Enviar</button>
                </form>
            </section>
        </main>
    )
}

export default ContactoPage;