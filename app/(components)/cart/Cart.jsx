"use client"

import { UseCart } from "@/context/CartContext"
import Overlay from "../overlay/Overlay"
import { CircleX } from "lucide-react"

export default function Cart({ className }) {
    const { isCartOpen, setIsCartOpen } = UseCart()
    return (
        <>
            <Overlay prop={isCartOpen} setProp={setIsCartOpen} />
            <div className={`fixed top-0 ${isCartOpen ? "right-0" : "-right-full"} transition-all duration-500 w-3/4 lg:w-[350px] h-full bg-white shadow-md z-40 pt-10 px-7`}>
                <div className="flex items-center justify-between">
                    <h3>Your Cart</h3>
                    <CircleX size={20} className="cursor-pointer transition-colors duration-300 hover:text-secondary" onClick={() => setIsCartOpen(false)} />
                </div>

                <div className="flex items-center justify-between mt-10">
                    <div>image</div>
                    <div>info</div>
                    <div>delete</div>
                </div>
            </div>
        </>

    )
}
