import ProductosContainer from "../../componentes/Productos/ProductosContainer/ProductosConainer";

function Inicio() {
    return (
        <>
            <section className="bienvenida">

                <p className="etiqueta">
                    SELECCIÓN DE NUESTRA CAVA
                </p>

                <h2>
                    Descubrí nuevos sabores
                </h2>

                <p>
                    Una cuidada propuesta para disfrutar y compartir cada momento
                </p>

            </section>

            <section className="productos">

                <ProductosContainer
                    mensaje="Vinos en oferta"
                    soloOfertas
                />

            </section>
        </>
    );
}

export default Inicio;
