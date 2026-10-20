import styles from "./SelectorCantidad.module.css";

function SelectorCantidad({ id, stock, cantidad, onCantidadChange }) {
    if (stock <= 0) {
        return <p className={styles.sinStock}>Sin stock</p>;
    }

    const disminuir = () => {
        onCantidadChange(Math.max(1, cantidad - 1));
    };

    const aumentar = () => {
        onCantidadChange(Math.min(stock, cantidad + 1));
    };

    const manejarCambio = (evento) => {
        const valor = Number(evento.target.value);

        if (Number.isNaN(valor)) {
            return;
        }

        onCantidadChange(Math.min(Math.max(1, valor), stock));
    };

    return (
        <div className={styles.selector}>

            <label htmlFor={`cantidad-${id}`}>
                Cantidad
            </label>

            <div className={styles.controles}>

                <button
                    type="button"
                    onClick={disminuir}
                    disabled={cantidad <= 1}
                    aria-label="Disminuir cantidad"
                >
                    −
                </button>

                <input
                    id={`cantidad-${id}`}
                    type="number"
                    min="1"
                    max={stock}
                    value={cantidad}
                    onChange={manejarCambio}
                />

                <button
                    type="button"
                    onClick={aumentar}
                    disabled={cantidad >= stock}
                    aria-label="Aumentar cantidad"
                >
                    +
                </button>

            </div>

            <span className={styles.disponible}>
                {stock} disponibles
            </span>

        </div>
    );
}

export default SelectorCantidad;
