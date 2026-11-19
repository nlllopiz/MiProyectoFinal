import styles from "./ListadoProductos.module.css";

const formatearPrecio = (precio) =>
    `$${Number(precio).toLocaleString("es-AR")}`;

function ListadoProductos({ productos, onEditar, onEliminar }) {
    if (productos.length === 0) {
        return (
            <section className={styles.listado}>
                <header className={styles.encabezado}>
                    <h3>Listado de productos</h3>
                </header>

                <p className={styles.vacio}>
                    No hay productos cargados. Completá el formulario para agregar el primero.
                </p>
            </section>
        );
    }

    return (
        <section className={styles.listado}>

            <header className={styles.encabezado}>
                <h3>Listado de productos</h3>

                <span>
                    {productos.length} {productos.length === 1 ? "producto" : "productos"}
                </span>
            </header>

            <div className={styles.tablaContenedor}>
                <table className={styles.tabla}>
                    <thead>
                        <tr>
                            <th scope="col">Producto</th>
                            <th scope="col">Precio</th>
                            <th scope="col">Stock</th>
                            <th scope="col">Oferta</th>
                            <th scope="col">Acciones</th>
                        </tr>
                    </thead>

                    <tbody>
                        {productos.map((producto) => (
                            <tr key={producto.id}>
                                <td>
                                    <div className={styles.producto}>
                                        {producto.imagen ? (
                                            <img
                                                src={producto.imagen}
                                                alt={producto.nombre}
                                                loading="lazy"
                                            />
                                        ) : (
                                            <span className={styles.sinImagen}>
                                                Sin imagen
                                            </span>
                                        )}

                                        <div>
                                            <strong>{producto.nombre}</strong>
                                            <span className={styles.id}>
                                                ID: {producto.id}
                                            </span>
                                        </div>
                                    </div>
                                </td>

                                <td>{formatearPrecio(producto.precio)}</td>

                                <td>{producto.stock}</td>

                                <td>{producto.oferta ? "Sí" : "No"}</td>

                                <td>
                                    <div className={styles.acciones}>
                                        <button
                                            type="button"
                                            className={styles.botonEditar}
                                            onClick={() => onEditar(producto)}
                                        >
                                            Editar
                                        </button>

                                        <button
                                            type="button"
                                            className={styles.botonEliminar}
                                            onClick={() => onEliminar(producto.id)}
                                        >
                                            Eliminar
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </section>
    );
}

export default ListadoProductos;
