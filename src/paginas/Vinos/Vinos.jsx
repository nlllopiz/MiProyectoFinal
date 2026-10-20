import ProductosContainer from "../../componentes/Productos/ProductosContainer/ProductosConainer";

function Vinos() {
    return (
        <section className="pagina">

            <ProductosContainer
                mensaje="Nuestros vinos"
                descripcion="Una selección de etiquetas pensada para acompañar cada ocasión. Elegí tu favorito y descubrí nuevos sabores."
            />

        </section>
    );
}

export default Vinos;
