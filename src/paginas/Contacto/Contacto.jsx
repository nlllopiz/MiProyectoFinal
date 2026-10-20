import { useState } from "react";

function Contacto() {
    const [datos, setDatos] = useState({
        nombre: "",
        email: "",
        mensaje: ""
    });

    const [enviado, setEnviado] = useState(false);

    const manejarCambio = (evento) => {
        const { name, value } = evento.target;

        setDatos({
            ...datos,
            [name]: value
        });
    };

    const manejarEnvio = (evento) => {
        evento.preventDefault();

        setEnviado(true);
        setDatos({
            nombre: "",
            email: "",
            mensaje: ""
        });
    };

    return (
        <section className="pagina">

            <p className="etiqueta">
                HABLEMOS
            </p>

            <h2 className="tituloPagina">
                Contacto
            </h2>

            <p className="descripcionPagina">
                ¿Querés hacer un pedido o necesitás asesoramiento? Escribinos y te
                respondemos a la brevedad.
            </p>

            <div className="contactoGrid">

                <div className="datosContacto">

                    <div className="datoContacto">
                        <h3>Visitanos</h3>
                        <p>Av. San Martín 1234<br />Mendoza, Argentina</p>
                    </div>

                    <div className="datoContacto">
                        <h3>Escribinos</h3>
                        <p>hola@codigovinario.com</p>
                    </div>

                    <div className="datoContacto">
                        <h3>Llamanos</h3>
                        <p>+54 261 555-1234</p>
                    </div>

                    <div className="datoContacto">
                        <h3>Horarios</h3>
                        <p>Lunes a sábado, de 10 a 20 h</p>
                    </div>

                </div>

                <form className="formularioContacto" onSubmit={manejarEnvio}>

                    <div className="campo">
                        <label htmlFor="nombre">Nombre</label>
                        <input
                            id="nombre"
                            name="nombre"
                            type="text"
                            value={datos.nombre}
                            onChange={manejarCambio}
                            placeholder="Tu nombre"
                            required
                        />
                    </div>

                    <div className="campo">
                        <label htmlFor="email">Email</label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            value={datos.email}
                            onChange={manejarCambio}
                            placeholder="tu@email.com"
                            required
                        />
                    </div>

                    <div className="campo">
                        <label htmlFor="mensaje">Mensaje</label>
                        <textarea
                            id="mensaje"
                            name="mensaje"
                            rows="5"
                            value={datos.mensaje}
                            onChange={manejarCambio}
                            placeholder="Contanos en qué te podemos ayudar"
                            required
                        />
                    </div>

                    <button type="submit" className="botonPrincipal">
                        Enviar mensaje
                    </button>

                    {enviado && (
                        <p className="mensajeExito">
                            ¡Gracias! Recibimos tu mensaje.
                        </p>
                    )}

                </form>

            </div>

        </section>
    );
}

export default Contacto;
