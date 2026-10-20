import { Link } from "react-router-dom";

import SelectorCantidad from "../SelectorCantidad/SelectorCantidad";

import styles from "./TarjetaProducto.module.css";

function TarjetaProducto({ id, imagen, nombre, precio, stock }) {
  return (
    <article className={styles.tarjeta}>

      <img
        className={styles.imagen}
        src={imagen}
        alt={nombre}
      />

      <div className={styles.contenido}>

        <h3 className={styles.nombre}>
          {nombre}
        </h3>

        <p className={styles.precio}>
          ${precio.toLocaleString("es-AR")}
        </p>

        <SelectorCantidad id={id} stock={stock} />

        <button className={styles.boton}>
          Agregar al carrito
        </button>

        <Link
          to={`/vinos/${id}`}
          className={styles.botonDetalle}
        >
          Ver detalle
        </Link>

      </div>

    </article>
  );
}

export default TarjetaProducto;
