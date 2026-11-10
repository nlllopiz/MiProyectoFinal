import { useEffect, useState } from "react";
import ProductosList from "../ProductosList/ProductosList";

import { obtenerProductos } from "../../../firestore/productos";
 
function ProductosContainer({
    mensaje = "Nuestros vinos",
    descripcion,
    soloOfertas = false
}) {
    const [productos, setProductos] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const obtenerProductosDeFirestore = async () => {
            try {
                const datos = await obtenerProductos();
                setProductos(datos);
            } catch (error) {
                setError(error.message);
            } finally {
                setCargando(false);
            }
        };

        obtenerProductosDeFirestore();
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