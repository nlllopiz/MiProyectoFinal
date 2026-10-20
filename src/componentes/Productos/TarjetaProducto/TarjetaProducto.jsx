import { useState } from "react";
import { Link } from "react-router-dom";

import { useCart } from "../../../context/CartContext";

import SelectorCantidad from "../SelectorCantidad/SelectorCantidad";
import LeyendaCarrito from "../LeyendaCarrito/LeyendaCarrito";

import styles from "./TarjetaProducto.module.css";

function TarjetaProducto({ id, imagen, nombre, precio, stock }) {
  const [cantidad, setCantidad] = useState(1);

  const { addToCart } = useCart();

  const agregarAlCarrito = () => {
    addToCart({ id, imagen, nombre, precio, stock }, cantidad);
  };

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

        <Link
          to={`/vinos/${id}`}
          className={styles.botonDetalle}
        >
          Ver detalle
        </Link>

        <SelectorCantidad
          id={id}
          stock={stock}
          cantidad={cantidad}
          onCantidadChange={setCantidad}
        />

        <button
          type="button"
          className={styles.boton}
          onClick={agregarAlCarrito}
          disabled={stock <= 0}
        >
          Agregar al carrito
        </button>

        <LeyendaCarrito productoId={id} />

      </div>

    </article>
  );
}

export default TarjetaProducto;
