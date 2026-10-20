import { Link } from "react-router-dom";

import { useCart } from "../../context/CartContext";

import styles from "./Carrito.module.css";

function Carrito() {
    const {
        cart,
        increaseQuantity,
        decreaseQuantity,
        removeItem,
        clearCart,
        totalItems,
        totalPrice
    } = useCart();

    if (cart.length === 0) {
        return (
            <section className="pagina paginaCentrada">

                <p className="etiqueta">
                    TU CARRITO
                </p>

                <h2 className="tituloPagina">
                    El carrito está vacío
                </h2>

                <p className="descripcionPagina">
                    Todavía no agregaste productos. Explorá nuestra selección
                    y encontrá el vino ideal para tu próxima ocasión.
                </p>

                <Link to="/vinos" className="botonPrincipal">
                    Ver vinos
                </Link>

            </section>
        );
    }

    return (
        <section className="pagina">

            <p className="etiqueta">
                TU COMPRA
            </p>

            <h2 className="tituloPagina">
                Carrito de compras
            </h2>

            <p className="descripcionPagina">
                Revisá los productos agregados antes de finalizar tu compra.
            </p>

            <div className={styles.contenido}>

                <div className={styles.lista}>

                    {cart.map((item) => (
                        <article key={item.id} className={styles.item}>

                            <img
                                className={styles.imagen}
                                src={item.imagen}
                                alt={item.nombre}
                            />

                            <div className={styles.informacion}>
                                <h3>{item.nombre}</h3>

                                <p className={styles.precioUnitario}>
                                    ${item.precio.toLocaleString("es-AR")} c/u
                                </p>

                                <div className={styles.cantidad}>
                                    <span>Cantidad:</span>

                                    <div className={styles.controles}>
                                        <button
                                            type="button"
                                            onClick={() => decreaseQuantity(item.id)}
                                            disabled={item.cantidad <= 1}
                                            aria-label={`Disminuir cantidad de ${item.nombre}`}
                                        >
                                            −
                                        </button>

                                        <span className={styles.valorCantidad}>
                                            {item.cantidad}
                                        </span>

                                        <button
                                            type="button"
                                            onClick={() => increaseQuantity(item.id)}
                                            disabled={item.cantidad >= item.stock}
                                            aria-label={`Aumentar cantidad de ${item.nombre}`}
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className={styles.derecha}>
                                <p className={styles.subtotal}>
                                    ${(item.precio * item.cantidad).toLocaleString("es-AR")}
                                </p>

                                <button
                                    type="button"
                                    className={styles.eliminar}
                                    onClick={() => removeItem(item.id)}
                                >
                                    Eliminar
                                </button>
                            </div>

                        </article>
                    ))}

                </div>

                <aside className={styles.resumen}>

                    <h3>Resumen de compra</h3>

                    <div className={styles.fila}>
                        <span>Productos</span>
                        <span>{totalItems}</span>
                    </div>

                    <div className={`${styles.fila} ${styles.total}`}>
                        <span>Total</span>
                        <strong>${totalPrice.toLocaleString("es-AR")}</strong>
                    </div>

                    <button
                        type="button"
                        className={styles.vaciar}
                        onClick={clearCart}
                    >
                        Vaciar carrito
                    </button>

                    <Link to="/vinos" className={styles.seguir}>
                        Seguir comprando
                    </Link>

                </aside>

            </div>

        </section>
    );
}

export default Carrito;
