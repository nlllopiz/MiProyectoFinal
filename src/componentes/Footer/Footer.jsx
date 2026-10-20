import styles from "./Footer.module.css";

function Footer() {
  return (
    <footer className={styles.footer}>

      <h2 className={styles.titulo}>
        Código Vinario
      </h2>

      <p className={styles.texto}>
        Vinos seleccionados para momentos especiales.
      </p>

      <p className={styles.copyright}>
        © 2026
      </p>

    </footer>
  );
}

export default Footer;
