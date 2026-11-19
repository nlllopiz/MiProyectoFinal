import { useEffect, useState } from "react";

import {
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut
} from "firebase/auth";

import { auth } from "../firestore/config";

import { ADMIN_EMAIL, AuthContext } from "./AuthContext";

function AuthProvider({ children }) {
    const [usuario, setUsuario] = useState(null);
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        const cancelarSuscripcion = onAuthStateChanged(
            auth,
            (usuarioFirebase) => {
                setUsuario(usuarioFirebase);
                setCargando(false);
            },
            (error) => {
                console.error("Error al verificar la sesión:", error);
                setCargando(false);
            }
        );

        return cancelarSuscripcion;
    }, []);

    const iniciarSesion = (email, password) =>
        signInWithEmailAndPassword(auth, email.trim(), password);

    const registrarUsuario = (email, password) =>
        createUserWithEmailAndPassword(auth, email.trim(), password);

    const cerrarSesion = () => signOut(auth);

    const esAdmin =
        usuario?.email?.toLowerCase() === ADMIN_EMAIL.toLowerCase();

    return (
        <AuthContext.Provider
            value={{
                usuario,
                cargando,
                esAdmin,
                iniciarSesion,
                registrarUsuario,
                cerrarSesion
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;
