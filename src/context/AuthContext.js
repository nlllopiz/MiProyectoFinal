import { createContext, useContext } from "react";

export const ADMIN_EMAIL = "admin@gmail.com";

export const AuthContext = createContext(null);

export function useAuth() {
    const contexto = useContext(AuthContext);

    if (!contexto) {
        throw new Error("useAuth debe utilizarse dentro de un AuthProvider");
    }

    return contexto;
}
