"use server"

import { db } from "@/config/db/db"
import { cartItemsTable, cartTable } from "@/config/db/schema"
import { eq } from "drizzle-orm"

export async function getCart(userEmail) {
    try {
        if(!userEmail) {
            return { success: false, error: "User email is required" }
        }

        const [cart] = await db.select().from(cartTable).where(eq(cartTable.userEmail, userEmail))
        if(!cart) {
            return { success: true, cartId: null, items: [] }
        }
        const cartItems = await db.select().from(cartItemsTable).where(eq(cartItemsTable.cartId, cart.id))
        return { success: true, cartId: cart.id, items: cartItems }
    } catch (error) {
        console.error("GET_CART_ERROR:", error)
        return { success: false, error: "Failed to get cart items" }
    }
}