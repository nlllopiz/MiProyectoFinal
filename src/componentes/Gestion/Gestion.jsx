import { useEffect, useRef, useState } from "react";

import FormularioProducto from "../FormularioProducto/FormularioProducto";
import ListadoProductos from "../ListadoProductos/ListadoProductos";

import {
    actualizarProducto,
    crearProducto,
    eliminarProducto,
    obtenerProductos
} from "../../services/productosService";

import styles from "./Gestion.module.css";

const estadoInicialForm = {
    id: "",
    nombre: "",
    precio: "",
    stock: "",
    imagen: "",
    descripcion: "",
    oferta: false
};

function Gestion() {
    const [productos, setProductos] = useState([]);
    const [datosForm, setDatosForm] = useState(estadoInicialForm);
    const [productoAEditar, setProductoAEditar] = useState(null);
    const [cargando, setCargando] = useState(true);
    const [guardando, setGuardando] = useState(false);
    const [error, setError] = useState(null);
    const [mensaje, setMensaje] = useState(null);

    const formularioRef = useRef(null);

    useEffect(() => {
        let activo = true;

        const cargarProductos = async () => {
            try {
                const datos = await obtenerProductos();

                if (activo) {
                    setProductos(datos);
                }
            } catch (error) {
                if (activo) {
                    setError(error.message);
                }
            } finally {
                if (activo) {
                    setCargando(false);
                }
            }
        };

        cargarProductos();

        return () => {
            activo = false;
        };
    }, []);

    const mostrarMensaje = (tipo, texto) => {
        setMensaje({ tipo, texto });
    };

    const limpiarFormulario = () => {
        setDatosForm({ ...estadoInicialForm });
        setProductoAEditar(null);
    };

    const manejarCambio = (evento) => {
        const { name, type, value, checked } = evento.target;

        setDatosForm((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value
        }));

        setMensaje(null);
    };

    const manejarEditar = (producto) => {
        setProductoAEditar(producto);

        setDatosForm({
            id: String(producto.id ?? ""),
            nombre: producto.nombre ?? "",
            precio: String(producto.precio ?? ""),
            stock: String(producto.stock ?? ""),
            imagen: producto.imagen ?? "",
            descripcion: producto.descripcion ?? "",
            oferta: Boolean(producto.oferta)
        });

        setMensaje(null);

        formularioRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    };

    const manejarCancelar = () => {
        limpiarFormulario();
        setMensaje(null);
    };

    const manejarEliminar = async (id) => {
        const producto = productos.find((item) => item.id === id);

        const confirmar = window.confirm(
            `¿Deseás eliminar${producto ? ` "${producto.nombre}"` : " este producto"}? Esta acción no se puede deshacer.`
        );

        if (!confirmar) {
            return;
        }

        try {
            await eliminarProducto(id);

            setProductos((prev) => prev.filter((item) => item.id !== id));

            if (productoAEditar?.id === id) {
                limpiarFormulario();
            }

            mostrarMensaje("exito", "Producto eliminado correctamente.");
        } catch (error) {
            console.error(error);
            mostrarMensaje("error", "No se pudo eliminar el producto. Intentá nuevamente.");
        }
    };

    const manejarEnvio = async (evento) => {
        evento.preventDefault();

        const id = datosForm.id.trim();
        const nombre = datosForm.nombre.trim();
        const imagen = datosForm.imagen.trim();
        const descripcion = datosForm.descripcion.trim();
        const precio = Number(datosForm.precio);
        const stock = Number(datosForm.stock);

        if (!id) {
            mostrarMensaje("error", "El ID del producto es obligatorio.");
            return;
        }

        if (id === "." || id === ".." || id.includes("/")) {
            mostrarMensaje("error", "El ID del producto no es válido.");
            return;
        }

        if (
            !nombre ||
            !imagen ||
            !descripcion ||
            datosForm.precio === "" ||
            !Number.isFinite(precio) ||
            precio <= 0 ||
            datosForm.stock === "" ||
            !Number.isInteger(stock) ||
            stock < 0
        ) {
            mostrarMensaje("error", "Verificá los datos ingresados antes de guardar.");
            return;
        }

        const producto = {
            id,
            nombre,
            precio,
            stock,
            imagen,
            descripcion,
            oferta: Boolean(datosForm.oferta)
        };

        setGuardando(true);

        try {
            if (productoAEditar) {
                const actualizado = await actualizarProducto(producto);

                setProductos((prev) =>
                    prev.map((item) =>
                        item.id === actualizado.id ? actualizado : item
                    )
                );

                mostrarMensaje("exito", "Producto actualizado correctamente.");
            } else {
                const creado = await crearProducto(producto);

                if (!creado) {
                    mostrarMensaje(
                        "error",
                        `Ya existe un producto con el ID "${id}". Elegí otro ID.`
                    );
                    return;
                }

                setProductos((prev) => [...prev, creado]);
                mostrarMensaje("exito", "Producto creado correctamente.");
            }

            limpiarFormulario();
        } catch (error) {
            console.error(error);
            mostrarMensaje("error", "No se pudo guardar el producto. Intentá nuevamente.");
        } finally {
            setGuardando(false);
        }
    };

    if (cargando) {
        return (
            <section className="pagina">
                <p>Cargando productos, por favor espere...</p>
            </section>
        );
    }

    if (error) {
        return (
            <section className="pagina">
                <p>Error al cargar los productos: {error}</p>
            </section>
        );
    }

    return (
        <section className="pagina">

            <p className="etiqueta">
                ADMINISTRACIÓN
            </p>

            <h2 className="tituloPagina">
                Gestión de Productos
            </h2>

            <p className="descripcionPagina">
                Creá, editá o eliminá productos del catálogo. Los cambios se
                guardan directamente en la base de datos.
            </p>

            {mensaje && (
                <p
                    className={`${styles.mensaje} ${styles[mensaje.tipo]}`}
                    role="status"
                >
                    {mensaje.texto}
                </p>
            )}

            <div ref={formularioRef} className={styles.formulario}>
                <FormularioProducto
                    datosForm={datosForm}
                    manejarCambio={manejarCambio}
                    manejarEnvio={manejarEnvio}
                    modoEdicion={Boolean(productoAEditar)}
                    onCancelar={manejarCancelar}
                    guardando={guardando}
                />
            </div>

            <ListadoProductos
                productos={productos}
                onEditar={manejarEditar}
                onEliminar={manejarEliminar}
            />

        </section>
    );
}

export default Gestion;
