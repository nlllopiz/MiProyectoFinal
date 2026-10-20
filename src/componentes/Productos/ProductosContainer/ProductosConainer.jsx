import { useEffect, useState } from "react";
import ProductosList from "../ProductosList/ProductosList";

function ProductosContainer({
    mensaje = "Nuestros vinos",
    descripcion,
    soloOfertas = false
}) {
    const [productos, setProductos] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const obtenerProductos = async () => {
            try {
                const respuesta = await fetch("/data/productos.json");

                if (!respuesta.ok) {
                    throw new Error("No se pudo cargar la información de los productos");
                }

                const datos = await respuesta.json();
                setProductos(datos);
            } catch (error) {
                setError(error.message);
            } finally {
                setCargando(false);
            }
        };

        obtenerProductos();
    }, []);

    if (cargando) {
        return <p>Cargando productos, por favor espere...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    const productosVisibles = soloOfertas
        ? productos.filter((producto) => producto.oferta)
        : productos;

    return (
        <ProductosList
            productos={productosVisibles}
            mensaje={mensaje}
            descripcion={descripcion}
        />
    );
}

export default ProductosContainer;