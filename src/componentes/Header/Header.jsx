import { NavLink, useNavigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";

import CartWidget from "../CartWidget/CartWidget";

import styles from "./Header.module.css";

const claseEnlace = ({ isActive }) =>
  isActive ? `${styles.enlace} ${styles.activo}` : styles.enlace;

function Header() {
  const { usuario, cargando, esAdmin, cerrarSesion } = useAuth();
  const navigate = useNavigate();

  const manejarCerrarSesion = async () => {
    try {
      await cerrarSesion();
      navigate("/", { replace: true });
    } catch (error) {
      console.error("No se pudo cerrar la sesión:", error);
    }
  };

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

          {esAdmin && (
            <>
              <NavLink to="/gestion" className={claseEnlace}>
                Gestión de Productos
              </NavLink>

              <NavLink to="/gestion-cupones" className={claseEnlace}>
                Gestión de Cupones
              </NavLink>
            </>
          )}

          <CartWidget />

          {!cargando && (
            usuario ? (
              <div className={styles.cuenta}>
                <span
                  className={styles.usuario}
                  title={usuario.email}
                >
                  {usuario.email}
                </span>

                <button
                  type="button"
                  className={styles.botonSesion}
                  onClick={manejarCerrarSesion}
                >
                  Cerrar sesión
                </button>
              </div>
            ) : (
              <NavLink to="/login" className={claseEnlace}>
                Iniciar sesión
              </NavLink>
            )
          )}
        </nav>

      </div>

    </header>
  );
}

export default Header;
