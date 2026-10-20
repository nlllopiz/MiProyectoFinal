import { useEffect, useState } from "react";
import EquipoList from "./EquipoList";

function EquipoContainer({ mensaje = "Nuestro Equipo" }) {
    const [equipo, setEquipo] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const obtenerProductos = async () => {
            try {
                const respuesta = await fetch("/data/equipo.json");

                if (!respuesta.ok) {
                    throw new Error("No se pudo cargar la información de los productos");
                }

                const datos = await respuesta.json();
                setEquipo(datos);
            } catch (error) {
                setError(error.message);
            } finally {
                setCargando(false);
            }
        };

        obtenerProductos();
    }, []);

    if (cargando) {
        return <p>Cargando productos, por favor espere...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <EquipoList
            equipo={equipo}
            mensaje={mensaje}
        />
    );
}

export default EquipoContainer;