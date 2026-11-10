import FormularioContainer from "../../componentes/FormularioContainer/FormularioContainer";

function Nuevo() {
    return (
        <section className="pagina">

            <p className="etiqueta">
                AGREGAR PRODUCTO
            </p>

            <h2 className="tituloPagina">
                Nuevo producto
            </h2>

            <p className="descripcionPagina">
                Completá los datos del producto y subí una imagen para sumarlo
                al catálogo.
            </p>

            <FormularioContainer />

        </section>
    );
}

export default Nuevo;
