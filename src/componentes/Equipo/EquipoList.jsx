import styles from "./Equipo.module.css"
import TarjetaEquipo from "./TarjetaEquipo";

function EquipoList({ equipo, mensaje }) {
    return (
        <>
        {mensaje && (
            <header className={styles.encabezado}>
                <h2>{mensaje}</h2>
            </header>
        )}
        <div className={styles.container}>
            {
                equipo.map((integrante) => (
                    <TarjetaEquipo 
                        key={integrante.id}    
                        {...integrante}
                    /> 
                                      
                ))
            }
        </div>
        </>
    );
}

export default EquipoList;