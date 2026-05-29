"use server"
import { db } from "@/config/db/db"
import { wishlistItemsTable, wishlistTable } from "@/config/db/schema"
import { eq } from "drizzle-orm"

export async function getWishlist(userEmail) {
    try {
        if (!userEmail) return []

        const [wishlist] = await db.select().from(wishlistTable).where(eq(wishlistTable.userEmail, userEmail)).limit(1)

        if (!wishlist) return []

        const items = await db.select().from(wishlistItemsTable).where(eq(wishlistItemsTable.wishlistId, wishlist.id))
        return items
    } catch (err) {
        console.error("Faild To Get Wishlist Items:", err)
        return []
    }
}