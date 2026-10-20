import { createContext, useContext } from "react";

export const CartContext = createContext(null);

export function useCart() {
    const contexto = useContext(CartContext);

    if (!contexto) {
        throw new Error("useCart debe utilizarse dentro de un CartProvider");
    }

    return contexto;
}
