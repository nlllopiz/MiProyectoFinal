import { NavLink } from "react-router-dom";

import CartWidget from "../CartWidget/CartWidget";

import styles from "./Header.module.css";

const claseEnlace = ({ isActive }) =>
  isActive ? `${styles.enlace} ${styles.activo}` : styles.enlace;

function Header() {
  return (
    <header className={styles.header}>

      <div className={styles.contenedor}>

        <div>
          <h1 className={styles.logo}>
            Código Vinario
          </h1>

          <p className={styles.subtitulo}>
            Vinos seleccionados
          </p>
        </div>

        <nav className={styles.nav}>
          <NavLink to="/" end className={claseEnlace}>
            Inicio
          </NavLink>

          <NavLink to="/vinos" className={claseEnlace}>
            Nuestros Vinos
          </NavLink>

          <NavLink to="/nosotros" className={claseEnlace}>
            Nosotros
          </NavLink>

          <NavLink to="/contacto" className={claseEnlace}>
            Contacto
          </NavLink>

          <CartWidget />
        </nav>

      </div>

    </header>
  );
}

export default Header;
