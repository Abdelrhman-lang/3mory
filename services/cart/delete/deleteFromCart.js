"use server"

import { db } from "@/config/db/db"
import { cartItemsTable } from "@/config/db/schema"
import { eq } from "drizzle-orm"

export async function deleteFromCart(itemId) {
    try {
        if(!itemId) {
            return { success: false, error: "Item ID is required" }
        }
        const deletedItem = await db.delete(cartItemsTable).where(eq(cartItemsTable.id, Number(itemId))).returning()
        if(!deletedItem || deletedItem.length === 0) {
            return { success: false, error: "Item not found or already deleted" }
        }
        return { success: true, message: "Item removed from cart successfully." }
    } catch (error) {
        console.error("DELETE_FROM_CART_ERROR:", error)
        return { success: false, error: "Failed to delete item from cart" }
    }
}