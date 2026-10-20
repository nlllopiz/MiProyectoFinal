import styles from "./Equipo.module.css"

function TarjetaEquipo({ nombre, email, puesto, foto }) {
  return (
    <article className={styles.tarjeta}>

      <img
        className={styles.imagen}
        src={foto}
        alt={`Foto de ${nombre}`}
      />

      <div className={styles.contenido}>

        <h3 className={styles.nombre}>
          {nombre}
        </h3>

        <p className={styles.puesto}>
          {puesto}
        </p>

        <a
          className={styles.email}
          href={`mailto:${email}`}
        >
          {email}
        </a>

      </div>

    </article>
  );
}

export default TarjetaEquipo;
