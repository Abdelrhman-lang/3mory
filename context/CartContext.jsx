"use client"

import { createContext, useContext, useState } from "react"

export const CartContext = createContext()



export default function CartProvider({ children }) {
    const [isCartOpen, setIsCartOpen] = useState(false)
    return (
        <CartContext.Provider value={{ isCartOpen, setIsCartOpen }}>
            {children}
        </CartContext.Provider>
    )
}

export const UseCart = () => useContext(CartContext)