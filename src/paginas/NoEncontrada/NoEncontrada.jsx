import { Link } from "react-router-dom";

function NoEncontrada() {
    return (
        <section className="pagina paginaCentrada">

            <p className="etiqueta">
                ERROR 404
            </p>

            <h2 className="tituloPagina">
                Esta página no existe
            </h2>

            <p className="descripcionPagina">
                La dirección que buscás no está disponible. Volvé al inicio para
                seguir explorando nuestros vinos.
            </p>

            <Link to="/" className="botonPrincipal">
                Volver al inicio
            </Link>

        </section>
    );
}

export default NoEncontrada;
