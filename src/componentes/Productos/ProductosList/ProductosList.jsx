import styles from "./ProductosList.module.css"
import TarjetaProducto from "../TarjetaProducto/TarjetaProducto";

function ProductosList({ productos, mensaje, descripcion }) {
    return (
        <>
        {mensaje && (
            <header className={styles.encabezado}>
                <h1>{mensaje}</h1>
                {descripcion && <p>{descripcion}</p>}
            </header>
        )}
        <div className={styles.container}>
            {
                productos.map((producto) => (
                    <TarjetaProducto 
                        key={producto.id}    
                        {...producto}
                    /> 
                                      
                ))
            }
        </div>
        </>
    );
}

export default ProductosList;