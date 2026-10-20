import styles from "./Equipo.module.css"

function TarjetaEquipo({ nombre, email, puesto, foto }) {
  return (
    <article className={styles.tarjeta}>

      <img
        className={styles.imagen}
        src={foto}
        alt={nombre}
      />

      <div className={styles.contenido}>

        <h3 className={styles.nombre}>
          {nombre}
        </h3>

        <p className={styles.precio}>
          {puesto}
        </p>

        <p className={styles.stock}>
          {email}
        </p>

      </div>

    </article>
  );
}

export default TarjetaEquipo;