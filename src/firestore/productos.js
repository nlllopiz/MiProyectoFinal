import { collection, doc, getDoc, getDocs } from "firebase/firestore";

import { db } from "./config";

const vinosRef = collection(db, "vinos");

const normalizarProducto = (documento) => {
    const datos = documento.data();

    return {
        id: documento.id,
        ...datos,
        nombre: datos.nombre ?? "Sin nombre",
        precio: Number(datos.precio) || 0,
        stock: Number(datos.stock) || 0,
        oferta: Boolean(datos.oferta),
        imagen: datos.imagen ?? "",
        descripcion: datos.descripcion ?? ""
    };
};

export const obtenerProductos = async () => {
    const snapshot = await getDocs(vinosRef);

    return snapshot.docs.map(normalizarProducto);
};

export const obtenerProductoPorId = async (id) => {
    const referencia = doc(db, "vinos", id);
    const snapshot = await getDoc(referencia);

    if (!snapshot.exists()) {
        return null;
    }

    return normalizarProducto(snapshot);
};
