import styles from "./FormularioProducto.module.css";

function FormularioProducto({
    datosForm,
    manejarCambio,
    manejarEnvio,
    modoEdicion = false,
    onCancelar,
    guardando = false
}) {
    return (
        <form onSubmit={manejarEnvio} className={styles.formulario}>

            <h3 className={styles.titulo}>
                {modoEdicion ? "Editar producto" : "Nuevo producto"}
            </h3>

            <div className="campo">
                <label htmlFor="id">ID del producto</label>
                <input
                    id="id"
                    type="text"
                    name="id"
                    value={datosForm.id}
                    onChange={manejarCambio}
                    placeholder="Ej: malbec-reserva"
                    disabled={modoEdicion}
                    required
                />
                {modoEdicion && (
                    <small className={styles.ayuda}>
                        El ID no se puede modificar al editar un producto.
                    </small>
                )}
            </div>

            <div className="campo">
                <label htmlFor="nombre">Nombre del producto</label>
                <input
                    id="nombre"
                    type="text"
                    name="nombre"
                    value={datosForm.nombre}
                    onChange={manejarCambio}
                    placeholder="Ej: Malbec Reserva"
                    minLength="3"
                    maxLength="80"
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
                    placeholder="Ej: 18500"
                    min="0.01"
                    step="0.01"
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
                    placeholder="Ej: 10"
                    min="0"
                    step="1"
                    required
                />
            </div>

            <div className="campo">
                <label htmlFor="imagen">Imagen (URL)</label>
                <input
                    id="imagen"
                    type="url"
                    name="imagen"
                    value={datosForm.imagen}
                    onChange={manejarCambio}
                    placeholder="https://..."
                    required
                />
            </div>

            {datosForm.imagen.trim() !== "" && (
                <div className={styles.vistaPrevia}>
                    <img
                        key={datosForm.imagen}
                        src={datosForm.imagen}
                        alt={`Vista previa de ${datosForm.nombre || "producto"}`}
                        onError={(evento) => {
                            evento.currentTarget.style.display = "none";
                        }}
                    />
                </div>
            )}

            <div className="campo">
                <label htmlFor="descripcion">Descripción</label>
                <textarea
                    id="descripcion"
                    name="descripcion"
                    value={datosForm.descripcion}
                    onChange={manejarCambio}
                    placeholder="Contá brevemente las características del producto..."
                    rows="4"
                    minLength="10"
                    maxLength="500"
                    required
                />
            </div>

            <div className={styles.campoOferta}>
                <input
                    id="oferta"
                    type="checkbox"
                    name="oferta"
                    checked={datosForm.oferta}
                    onChange={manejarCambio}
                />
                <label htmlFor="oferta">
                    Producto en oferta
                </label>
            </div>

            <div className={styles.acciones}>
                <button
                    type="submit"
                    className="botonPrincipal"
                    disabled={guardando}
                >
                    {guardando
                        ? "Guardando..."
                        : modoEdicion
                            ? "Actualizar producto"
                            : "Guardar producto"}
                </button>

                {modoEdicion && (
                    <button
                        type="button"
                        className={styles.botonSecundario}
                        onClick={onCancelar}
                        disabled={guardando}
                    >
                        Cancelar edición
                    </button>
                )}
            </div>

        </form>
    );
}

export default FormularioProducto;
