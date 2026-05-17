"use client"

import Overlay from "../../shared/overlay/Overlay"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { useUser } from "@clerk/nextjs"
import { closeCart, deleteItemFromCart, getCartItems } from "@/RTK/slices/cartSlice"


import CartHeader from "./cart-header/CartHeader"
import CartItems from "./cart-items/CartItems"
import CartPrices from "./cart-prices/CartPrices"
import CartBtns from "./cart-btns/CartBtns"
import { createOrder } from "@/RTK/slices/orderSlice"
import { Spinner } from "@/components/ui/spinner"

export default function Cart({ className }) {
    const dispatch = useDispatch()
    const { items, isOpen, totalPrice, loading } = useSelector((state) => state.cart)
    const { user } = useUser()
    const userEmail = user?.primaryEmailAddress?.emailAddress;
    useEffect(() => {
        if (userEmail) {
            dispatch(getCartItems({ userEmail }))
        }
    }, [userEmail])
    const vat = 10

    return (
        <>
            <Overlay prop={isOpen} fn={() => dispatch(closeCart())} />
            <div className={`overflow-y-scroll fixed top-0 ${isOpen ? "right-0" : "-right-full"} transition-all duration-500 w-3/4 md:w-[400px] h-full bg-white shadow-md z-40 pt-10 px-7`}>
                <CartHeader fn={() => dispatch(closeCart())} />
                <CartItems deleteItemFromCart={deleteItemFromCart} dispatch={dispatch} userEmail={userEmail} items={items} />
                {items?.length > 0 ? (
                    loading ? (
                        <div className="flex items-center justify-center">
                            <Spinner className={"size-6"} />
                        </div>
                    ) : (
                        <>
                            <CartPrices totalPrice={totalPrice} vat={vat} />
                            <CartBtns fn={() => dispatch(createOrder({ userEmail, items, totalPrice }))} />
                        </>
                    )
                ) : (
                    <div className="flex items-center justify-center min-h-1/2">
                        <p className="capitalize text-sm text-center md:text-lg">Your Cart is Empty add some products</p>
                    </div>
                )}
            </div>
        </>

    )
}
