import { useCart } from "../../../context/CartContext";

import styles from "./LeyendaCarrito.module.css";

function LeyendaCarrito({ productoId }) {
    const { cart } = useCart();

    const productoEnCarrito = cart.find((item) => item.id === productoId);
    const cantidad = productoEnCarrito?.cantidad ?? 0;

    return (
        <p
            className={`${styles.leyenda} ${cantidad > 0 ? styles.conProductos : ""}`}
            aria-live="polite"
        >
            {cantidad > 0
                ? `En el carrito: ${cantidad} ${cantidad === 1 ? "unidad" : "unidades"}`
                : "Aún no agregaste este producto al carrito"}
        </p>
    );
}

export default LeyendaCarrito;
