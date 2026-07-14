"use server"
import { db } from "@/config/db/db"
import { wishlistItemsTable } from "@/config/db/schema"
import { eq } from "drizzle-orm"

export async function deleteFromWishlist(wishlistItemId) {
    try {
        if(!wishlistItemId) {
            throw new Error("Faild to Delete This Item from Wishlist.")
        }
        const deletedItem = await db.delete(wishlistItemsTable).where(eq(wishlistItemsTable.id, wishlistItemId)).returning()
        if(!deletedItem || deletedItem.length === 0) {
            return { success: false, error: "Item not found or already deleted." }
        } 
        return { success: true, message: "Item deleted from wishlist successfully." }
    } catch (error) {
        console.error("Error deleting item from wishlist:", error)
        return { success: false, error: error.message || "Failed to delete item from wishlist." }
    }
}