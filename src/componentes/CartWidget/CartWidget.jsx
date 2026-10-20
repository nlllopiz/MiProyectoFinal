import { Link } from "react-router-dom";

import { useCart } from "../../context/CartContext";

import styles from "./CartWidget.module.css";

function CartWidget() {
    const { totalItems } = useCart();

    return (
        <Link
            to="/carrito"
            className={styles.carrito}
            aria-label={`Carrito de compras: ${totalItems} productos`}
        >
            <svg
                className={styles.icono}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
            >
                <circle cx="9" cy="21" r="1" />
                <circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>

            <span className={styles.contador} aria-live="polite">
                {totalItems}
            </span>
        </Link>
    );
}

export default CartWidget;
