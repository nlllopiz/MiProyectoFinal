import { useState } from "react";
import { Navigate, useLocation } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";

import styles from "./Login.module.css";

const mensajesError = {
    "auth/invalid-email": "El correo electrónico no es válido.",
    "auth/user-disabled": "Esta cuenta está deshabilitada.",
    "auth/user-not-found": "No existe una cuenta con ese correo.",
    "auth/wrong-password": "La contraseña es incorrecta.",
    "auth/invalid-credential": "El correo o la contraseña son incorrectos.",
    "auth/email-already-in-use": "Ya existe una cuenta con ese correo.",
    "auth/weak-password": "La contraseña debe tener al menos 6 caracteres.",
    "auth/missing-password": "Ingresá una contraseña.",
    "auth/too-many-requests": "Demasiados intentos. Probá nuevamente más tarde.",
    "auth/network-request-failed": "No se pudo conectar con Firebase. Revisá tu conexión.",
    "auth/operation-not-allowed":
        "El inicio de sesión con email y contraseña no está habilitado en Firebase.",
    "auth/configuration-not-found":
        "Firebase Authentication no está configurado. Habilitá el método Email/Password en la consola de Firebase."
};

const obtenerMensajeError = (codigo) =>
    mensajesError[codigo] ?? "Ocurrió un error. Intentá nuevamente.";

function Login() {
    const { usuario, cargando, iniciarSesion, registrarUsuario } = useAuth();

    const location = useLocation();

    const [modo, setModo] = useState("login");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [enviando, setEnviando] = useState(false);

    const destino = location.state?.from?.pathname ?? "/";
    const modoRegistro = modo === "registro";

    const manejarEnvio = async (evento) => {
        evento.preventDefault();

        setError(null);
        setEnviando(true);

        try {
            if (modoRegistro) {
                await registrarUsuario(email, password);
            } else {
                await iniciarSesion(email, password);
            }
        } catch (error) {
            console.error(error);
            setError(obtenerMensajeError(error.code));
        } finally {
            setEnviando(false);
        }
    };

    const cambiarModo = () => {
        setModo((actual) => (actual === "login" ? "registro" : "login"));
        setError(null);
        setPassword("");
    };

    if (cargando) {
        return (
            <section className="pagina">
                <p>Verificando sesión, por favor espere...</p>
            </section>
        );
    }

    if (usuario) {
        return <Navigate to={destino} replace />;
    }

    return (
        <section className="pagina">

            <div className={styles.encabezado}>
                <p className="etiqueta">
                    ACCESO
                </p>

                <h2 className="tituloPagina">
                    {modoRegistro ? "Crear una cuenta" : "Iniciar sesión"}
                </h2>

                <p className="descripcionPagina">
                    {modoRegistro
                        ? "Registrate con tu correo electrónico para crear una cuenta."
                        : "Ingresá con tu cuenta. La gestión de productos y cupones está reservada al administrador."}
                </p>
            </div>

            <form onSubmit={manejarEnvio} className={styles.formulario}>

                <h3 className={styles.tituloFormulario}>
                    {modoRegistro ? "Registro" : "Ingreso"}
                </h3>

                {error && (
                    <p className={styles.error} role="alert">
                        {error}
                    </p>
                )}

                <div className="campo">
                    <label htmlFor="email">Correo electrónico</label>
                    <input
                        id="email"
                        type="email"
                        name="email"
                        value={email}
                        onChange={(evento) => setEmail(evento.target.value)}
                        placeholder="Ej: usuario@correo.com"
                        autoComplete="email"
                        required
                    />
                </div>

                <div className="campo">
                    <label htmlFor="password">Contraseña</label>
                    <input
                        id="password"
                        type="password"
                        name="password"
                        value={password}
                        onChange={(evento) => setPassword(evento.target.value)}
                        placeholder="Ingresá tu contraseña"
                        autoComplete={modoRegistro ? "new-password" : "current-password"}
                        minLength="6"
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="botonPrincipal"
                    disabled={enviando}
                >
                    {enviando
                        ? "Procesando..."
                        : modoRegistro
                            ? "Crear cuenta"
                            : "Ingresar"}
                </button>

                <button
                    type="button"
                    className={styles.cambiarModo}
                    onClick={cambiarModo}
                    disabled={enviando}
                >
                    {modoRegistro
                        ? "¿Ya tenés cuenta? Iniciar sesión"
                        : "¿No tenés cuenta? Crear una"}
                </button>

                <p className={styles.ayuda}>
                    El acceso a las gestiones está reservado para
                    {" "}
                    <strong>admin@gmail.com</strong>.
                </p>

            </form>

        </section>
    );
}

export default Login;
