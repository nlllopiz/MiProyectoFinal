import EquipoContainer from "../../componentes/Equipo/EquipoContainer";

function Nosotros() {
    return (
        <section className="pagina">

            <p className="etiqueta">
                QUIÉNES SOMOS
            </p>

            <h2 className="tituloPagina">
                Nuestra historia
            </h2>

            <p className="descripcionPagina">
                En Código Vinario seleccionamos vinos de bodegas argentinas para acercarte
                lo mejor de cada región. Nos apasiona encontrar etiquetas que cuenten una
                historia y que acompañen los momentos más especiales.
            </p>

            <p className="descripcionPagina">
                Trabajamos junto a pequeños productores y bodegas reconocidas, cuidando
                cada detalle desde la cosecha hasta tu mesa.
            </p>

            <EquipoContainer mensaje="Nuestro equipo" />

        </section>
    );
}

export default Nosotros;
