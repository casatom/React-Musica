import React from "react";
import { useState } from "react";
import axios from 'axios'

const ContactoPage = (props) => {

    const initialForm = {
        nombreMailer: '',
        correoMailer: '' ,
        mensajeMailer:''
    }

    const [sending,setSending] = useState(false);
    const [msg, setMsg] = useState('');
    const [formData, setFormData] = useState(initialForm);

    const handleChange = e => {
        const {name, value} = e.target;
        setFormData(oldData => ({
            ...oldData,
            [name]:value
        }));
    }

    const handleSubmit = async e => {
        e.preventDefault();
        setMsg('');
        setSending(true)
        const response = await axios.post('http://localhost:3000/api/contacto', formData);
        setSending(false);
        setMsg(response.data.message);
        if(response.data.error === false){
            setFormData(initialForm)
        }
    }


    return (
        <main>
            <section id="contacto">
                <h2>Contacto</h2>
                <form action='\contacto' method="post" onSubmit={handleSubmit}>
                    <div>
                        <label for="nombre">Nombre:</label>
                        <input type="text" name="nombreMailer" value={formData.nombreMailer} onChange={handleChange} required />
                    </div>
                    <div>
                        <label for="correo">Correo electrónico:</label>
                        <input type="email"  name="correoMailer" value={formData.correoMailer} onChange={handleChange} required />
                    </div>
                    <div>
                        <label for="mensaje">Mensaje:</label>
                        <textarea name="mensajeMailer" value={formData.mensajeMailer} onChange={handleChange} required></textarea>
                    </div>

                    {sending ? <p>Enviando...</p> : null}
                    {msg ? <p>{msg}</p> : null}

                    <button type="submit" class="btn">Enviar</button>
                </form>
            </section>
        </main>
    )
}

export default ContactoPage;