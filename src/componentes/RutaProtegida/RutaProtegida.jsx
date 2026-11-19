import { Link, Navigate, useLocation } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";

function RutaProtegida({ children, soloAdmin = false }) {
    const { usuario, cargando, esAdmin } = useAuth();
    const location = useLocation();

    if (cargando) {
        return (
            <section className="pagina">
                <p>Verificando sesión, por favor espere...</p>
            </section>
        );
    }

    if (!usuario) {
        return (
            <Navigate
                to="/login"
                state={{ from: location }}
                replace
            />
        );
    }

    if (soloAdmin && !esAdmin) {
        return (
            <section className="pagina paginaCentrada">
                <p className="etiqueta">
                    ACCESO RESTRINGIDO
                </p>

                <h2 className="tituloPagina">
                    Área exclusiva del administrador
                </h2>

                <p className="descripcionPagina">
                    Tu cuenta no tiene permisos para acceder a esta sección.
                    Iniciá sesión con una cuenta de administrador para continuar.
                </p>

                <Link to="/" className="botonPrincipal">
                    Volver al inicio
                </Link>
            </section>
        );
    }

    return children;
}

export default RutaProtegida;
