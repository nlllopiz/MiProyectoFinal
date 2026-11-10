import styles from "./FormularioProducto.module.css";

function FormularioProducto({ datosForm, manejarCambio, manejarEnvio, manejarCambioImagen }) {
    return (
        <form onSubmit={manejarEnvio} className={styles.formulario}>

            <h3 className={styles.titulo}>
                Agregar Nuevo Producto
            </h3>

            <div className="campo">
                <label htmlFor="id">Id</label>
                <input
                    id="id"
                    type="text"
                    name="id"
                    value={datosForm.id}
                    onChange={manejarCambio}
                    placeholder="Ej: 4"
                    required
                />
            </div>

            <div className="campo">
                <label htmlFor="nombre">Nombre del Producto</label>
                <input
                    id="nombre"
                    type="text"
                    name="nombre"
                    value={datosForm.nombre}
                    onChange={manejarCambio}
                    placeholder="Ej: Teclado Mecánico"
                    required
                />
            </div>

            <div className="campo">
                <label htmlFor="precio">Precio</label>
                <input
                    id="precio"
                    type="number"
                    name="precio"
                    value={datosForm.precio}
                    onChange={manejarCambio}
                    placeholder="Ej: 95"
                    min="0"
                    required
                />
            </div>

            <div className="campo">
                <label htmlFor="stock">Stock</label>
                <input
                    id="stock"
                    type="number"
                    name="stock"
                    value={datosForm.stock}
                    onChange={manejarCambio}
                    placeholder="Ej: 5"
                    min="0"
                    required
                />
            </div>

            <div className="campo">
                <label htmlFor="imagen">Imagen</label>
                <input
                    id="imagen"
                    type="file"
                    name="imagen"
                    accept="image/*"
                    onChange={manejarCambioImagen}
                    required
                />
            </div>

            <button type="submit" className="botonPrincipal">
                Guardar Producto
            </button>

        </form>
    );
}

export default FormularioProducto;
