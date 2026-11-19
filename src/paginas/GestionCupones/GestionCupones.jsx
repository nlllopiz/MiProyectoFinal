import { useEffect, useState } from "react";

import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDocs
} from "firebase/firestore";

import { db } from "../../firestore/config";

import styles from "./GestionCupones.module.css";

const cuponesRef = collection(db, "cupones");

const estadoInicialForm = {
    codigo: "",
    porcentaje: ""
};

function GestionCupones() {
    const [cupones, setCupones] = useState([]);
    const [formulario, setFormulario] = useState(estadoInicialForm);
    const [cargando, setCargando] = useState(true);
    const [guardando, setGuardando] = useState(false);
    const [eliminandoId, setEliminandoId] = useState(null);
    const [errorCarga, setErrorCarga] = useState(null);
    const [mensaje, setMensaje] = useState(null);

    useEffect(() => {
        let activo = true;

        const cargarCupones = async () => {
            try {
                const snapshot = await getDocs(cuponesRef);

                const datos = snapshot.docs.map((documento) => {
                    const cupon = documento.data();

                    return {
                        id: documento.id,
                        codigo: cupon.codigo ?? "",
                        porcentaje: Number(cupon.porcentaje) || 0
                    };
                });

                if (activo) {
                    setCupones(datos);
                }
            } catch (error) {
                if (activo) {
                    setErrorCarga(error.message);
                }
            } finally {
                if (activo) {
                    setCargando(false);
                }
            }
        };

        cargarCupones();

        return () => {
            activo = false;
        };
    }, []);

    const mostrarMensaje = (tipo, texto) => {
        setMensaje({ tipo, texto });
    };

    const manejarCambio = (evento) => {
        const { name, value } = evento.target;

        setFormulario((prev) => ({
            ...prev,
            [name]: value
        }));

        setMensaje(null);
    };

    const manejarEnvio = async (evento) => {
        evento.preventDefault();

        const codigo = formulario.codigo.trim();
        const porcentaje = Number(formulario.porcentaje);

        if (!codigo) {
            mostrarMensaje("error", "El código del cupón es obligatorio.");
            return;
        }

        if (
            formulario.porcentaje === "" ||
            !Number.isFinite(porcentaje) ||
            !Number.isInteger(porcentaje) ||
            porcentaje < 1 ||
            porcentaje > 100
        ) {
            mostrarMensaje("error", "El porcentaje debe ser un número entero entre 1 y 100.");
            return;
        }

        setGuardando(true);

        try {
            const documentoCreado = await addDoc(cuponesRef, {
                codigo,
                porcentaje
            });

            setCupones((prev) => [
                ...prev,
                {
                    id: documentoCreado.id,
                    codigo,
                    porcentaje
                }
            ]);

            setFormulario(estadoInicialForm);
            mostrarMensaje("exito", `Cupón "${codigo}" creado correctamente.`);
        } catch (error) {
            console.error(error);
            mostrarMensaje("error", "No se pudo crear el cupón. Intentá nuevamente.");
        } finally {
            setGuardando(false);
        }
    };

    const manejarEliminar = async (cupon) => {
        const confirmar = window.confirm(
            `¿Deseás eliminar el cupón "${cupon.codigo}"? Esta acción no se puede deshacer.`
        );

        if (!confirmar) {
            return;
        }

        setEliminandoId(cupon.id);

        try {
            await deleteDoc(doc(db, "cupones", cupon.id));

            setCupones((prev) =>
                prev.filter((item) => item.id !== cupon.id)
            );

            mostrarMensaje("exito", `Cupón "${cupon.codigo}" eliminado correctamente.`);
        } catch (error) {
            console.error(error);
            mostrarMensaje("error", "No se pudo eliminar el cupón. Intentá nuevamente.");
        } finally {
            setEliminandoId(null);
        }
    };

    if (cargando) {
        return (
            <section className="pagina">
                <p>Cargando cupones, por favor espere...</p>
            </section>
        );
    }

    if (errorCarga) {
        return (
            <section className="pagina">
                <p>Error al cargar los cupones: {errorCarga}</p>
            </section>
        );
    }

    return (
        <section className="pagina">

            <p className="etiqueta">
                ADMINISTRACIÓN
            </p>

            <h2 className="tituloPagina">
                Gestión de Cupones
            </h2>

            <p className="descripcionPagina">
                Creá cupones de descuento y eliminá los que ya no estén vigentes.
                Los cambios se guardan directamente en la base de datos.
            </p>

            {mensaje && (
                <p
                    className={`${styles.mensaje} ${styles[mensaje.tipo]}`}
                    role="status"
                >
                    {mensaje.texto}
                </p>
            )}

            <form onSubmit={manejarEnvio} className={styles.formulario}>

                <h3 className={styles.tituloFormulario}>
                    Nuevo cupón
                </h3>

                <div className="campo">
                    <label htmlFor="codigo">Código del cupón</label>
                    <input
                        id="codigo"
                        type="text"
                        name="codigo"
                        value={formulario.codigo}
                        onChange={manejarCambio}
                        placeholder="Ej: BIENVENIDO10"
                        maxLength="30"
                        required
                    />
                </div>

                <div className="campo">
                    <label htmlFor="porcentaje">Porcentaje de descuento</label>
                    <input
                        id="porcentaje"
                        type="number"
                        name="porcentaje"
                        value={formulario.porcentaje}
                        onChange={manejarCambio}
                        placeholder="Ej: 10"
                        min="1"
                        max="100"
                        step="1"
                        required
                    />
                </div>

                <div className={styles.accionesFormulario}>
                    <button
                        type="submit"
                        className="botonPrincipal"
                        disabled={guardando}
                    >
                        {guardando ? "Guardando..." : "Crear cupón"}
                    </button>
                </div>

            </form>

            <section className={styles.listado}>

                <header className={styles.encabezado}>
                    <h3>Listado de cupones</h3>

                    <span>
                        {cupones.length} {cupones.length === 1 ? "cupón" : "cupones"}
                    </span>
                </header>

                {cupones.length === 0 ? (
                    <p className={styles.vacio}>
                        No hay cupones cargados. Completá el formulario para crear el primero.
                    </p>
                ) : (
                    <div className={styles.tablaContenedor}>
                        <table className={styles.tabla}>
                            <thead>
                                <tr>
                                    <th scope="col">Código</th>
                                    <th scope="col">Descuento</th>
                                    <th scope="col">Acciones</th>
                                </tr>
                            </thead>

                            <tbody>
                                {cupones.map((cupon) => (
                                    <tr key={cupon.id}>
                                        <td>
                                            <span className={styles.codigo}>
                                                {cupon.codigo}
                                            </span>
                                        </td>

                                        <td>
                                            <span className={styles.descuento}>
                                                {cupon.porcentaje}%
                                            </span>
                                        </td>

                                        <td>
                                            <button
                                                type="button"
                                                className={styles.botonEliminar}
                                                onClick={() => manejarEliminar(cupon)}
                                                disabled={eliminandoId === cupon.id}
                                            >
                                                {eliminandoId === cupon.id
                                                    ? "Eliminando..."
                                                    : "Eliminar"}
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

            </section>

        </section>
    );
}

export default GestionCupones;
