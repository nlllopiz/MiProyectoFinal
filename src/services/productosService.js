import {
    collection,
    deleteDoc,
    doc,
    getDoc,
    getDocs,
    setDoc
} from "firebase/firestore";

import { db } from "../firestore/config";

const vinosRef = collection(db, "vinos");

const normalizarProducto = (documento) => {
    const datos = documento.data();

    return {
        ...datos,
        id: documento.id,
        nombre: datos.nombre ?? "Sin nombre",
        precio: Number(datos.precio) || 0,
        stock: Number(datos.stock) || 0,
        oferta: Boolean(datos.oferta),
        imagen: datos.imagen ?? "",
        descripcion: datos.descripcion ?? ""
    };
};

const normalizarId = (id) => String(id ?? "").trim();

const validarId = (id) => {
    if (!id) {
        throw new Error("El ID del producto es obligatorio.");
    }

    if (id === "." || id === ".." || id.includes("/")) {
        throw new Error("El ID del producto no es válido.");
    }
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

export const crearProducto = async (producto) => {
    const id = normalizarId(producto.id);

    validarId(id);

    const referencia = doc(db, "vinos", id);
    const documentoExistente = await getDoc(referencia);

    if (documentoExistente.exists()) {
        return null;
    }

    const productoCompleto = {
        ...producto,
        id
    };

    await setDoc(referencia, productoCompleto);

    return productoCompleto;
};

export const actualizarProducto = async (producto) => {
    const id = normalizarId(producto.id);

    validarId(id);

    const productoCompleto = {
        ...producto,
        id
    };

    await setDoc(doc(db, "vinos", id), productoCompleto, { merge: true });

    return productoCompleto;
};

export const eliminarProducto = async (id) => {
    const idLimpio = normalizarId(id);

    validarId(idLimpio);

    await deleteDoc(doc(db, "vinos", idLimpio));
};
