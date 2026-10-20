import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import SelectorCantidad from "../../componentes/Productos/SelectorCantidad/SelectorCantidad";

import styles from "./ProductoDetalle.module.css";

function ProductoDetalle() {
    const { id } = useParams();

    const [producto, setProducto] = useState(null);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let activo = true;

        const obtenerProducto = async () => {
            try {
                setCargando(true);
                setError(null);

                const respuesta = await fetch("/data/productos.json");

                if (!respuesta.ok) {
                    throw new Error("No se pudo cargar la información del producto");
                }

                const productos = await respuesta.json();

                const productoEncontrado = productos.find(
                    (item) => String(item.id) === id
                );

                if (!productoEncontrado) {
                    throw new Error("No se encontró el producto solicitado");
                }

                if (activo) {
                    setProducto(productoEncontrado);
                }
            } catch (error) {
                if (activo) {
                    setError(error.message);
                }
            } finally {
                if (activo) {
                    setCargando(false);
                }
            }
        };

        obtenerProducto();

        return () => {
            activo = false;
        };
    }, [id]);

    if (cargando) {
        return (
            <section className="pagina">
                <p>Cargando producto, por favor espere...</p>
            </section>
        );
    }

    if (error) {
        return (
            <section className="pagina paginaCentrada">
                <p className="etiqueta">
                    PRODUCTO NO DISPONIBLE
                </p>

                <h2 className="tituloPagina">
                    No pudimos mostrar este vino
                </h2>

                <p className="descripcionPagina">
                    {error}
                </p>

                <Link to="/vinos" className="botonPrincipal">
                    Volver a vinos
                </Link>
            </section>
        );
    }

    return (
        <section className="pagina">

            <Link to="/vinos" className={styles.volver}>
                ← Volver a vinos
            </Link>

            <div className={styles.detalle}>

                <div className={styles.imagenContenedor}>
                    <img
                        className={styles.imagen}
                        src={producto.imagen}
                        alt={producto.nombre}
                    />
                </div>

                <div className={styles.informacion}>

                    {producto.oferta && (
                        <span className={styles.oferta}>
                            En oferta
                        </span>
                    )}

                    <h2 className="tituloPagina">
                        {producto.nombre}
                    </h2>

                    <p className={styles.precio}>
                        ${producto.precio.toLocaleString("es-AR")}
                    </p>

                    <p className={styles.descripcion}>
                        {producto.descripcion}
                    </p>

                    <ul className={styles.datos}>
                        <li>
                            <span>ID</span>
                            <strong>{producto.id}</strong>
                        </li>

                        <li>
                            <span>Precio</span>
                            <strong>${producto.precio.toLocaleString("es-AR")}</strong>
                        </li>

                        <li>
                            <span>Stock</span>
                            <strong>{producto.stock} unidades</strong>
                        </li>

                        <li>
                            <span>Oferta</span>
                            <strong>{producto.oferta ? "Sí" : "No"}</strong>
                        </li>
                    </ul>

                    <SelectorCantidad
                        id={producto.id}
                        stock={producto.stock}
                    />

                    <button type="button" className={styles.botonCarrito}>
                        Agregar al carrito
                    </button>

                </div>

            </div>

        </section>
    );
}

export default ProductoDetalle;
