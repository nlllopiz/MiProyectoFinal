import { useState } from "react";

import { CartContext } from "./CartContext";

function CartProvider({ children }) {
    const [cart, setCart] = useState([]);

    const addToCart = (producto, cantidad = 1) => {
        const cantidadSolicitada = Number(cantidad);

        if (!Number.isFinite(cantidadSolicitada) || producto.stock <= 0) {
            return;
        }

        const cantidadAgregar = Math.min(
            Math.max(1, Math.floor(cantidadSolicitada)),
            producto.stock
        );

        setCart((actual) => {
            const productoExistente = actual.find(
                (item) => item.id === producto.id
            );

            if (productoExistente) {
                return actual.map((item) =>
                    item.id === producto.id
                        ? {
                            ...item,
                            cantidad: Math.min(
                                item.cantidad + cantidadAgregar,
                                producto.stock
                            )
                        }
                        : item
                );
            }

            return [
                ...actual,
                {
                    id: producto.id,
                    nombre: producto.nombre,
                    precio: producto.precio,
                    imagen: producto.imagen,
                    stock: producto.stock,
                    cantidad: cantidadAgregar
                }
            ];
        });
    };

    const removeItem = (id) => {
        setCart((actual) => actual.filter((item) => item.id !== id));
    };

    const clearCart = () => {
        setCart([]);
    };

    const totalItems = cart.reduce(
        (total, item) => total + item.cantidad,
        0
    );

    const totalPrice = cart.reduce(
        (total, item) => total + item.precio * item.cantidad,
        0
    );

    return (
        <CartContext.Provider
            value={{
                cart,
                addToCart,
                removeItem,
                clearCart,
                totalItems,
                totalPrice
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export default CartProvider;
