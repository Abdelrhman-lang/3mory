"use server"
import { db } from "@/config/db/db"
import { wishlistItemsTable, wishlistTable } from "@/config/db/schema"
import { eq } from "drizzle-orm"

export async function createWishlist(userEmail, productId, productImage, productName, productPrice, productQuantity) {
    try {
        if (!userEmail) return null

        let [wishlist] = await db.select().from(wishlistTable).where(eq(wishlistTable.userEmail, userEmail))

        if (!wishlist) {
            const [newWishlist] = await db.insert(wishlistTable).values({
                userEmail
            }).returning()
            wishlist = newWishlist
        }

        const [inserted] = await db.insert(wishlistItemsTable).values({
            wishlistId: wishlist.id,
            productId: productId,
            productName: productName,
            image: productImage,
            price: productPrice,
            quantity: productQuantity
        }).returning()
        return inserted

    } catch (err) {
        console.error("Faild To Add Product in Wishlist: ", err)
        return null
    }
}