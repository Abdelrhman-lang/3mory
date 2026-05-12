"use server"

import { db } from "@/config/db/db"
import { cartItemsTable, cartTable } from "@/config/db/schema"
import { auth } from "@clerk/nextjs/server"
import { and, eq } from "drizzle-orm"
import { revalidateTag } from "next/cache"


export async function addToCart({ productData }) {
    const { userEmail } = await auth()

    if (!userEmail) {
        throw new Error("Login required to add items to cart")
    }

    try {
        return await db.transaction(async (tx) => {
            let userCart = await tx.query.cartTable.findFirst({
                where: eq(cartTable.userEmail, userEmail)
            })

            if (!userCart) {
                const [newUserCart] = await tx.insert(cartTable).values({
                    userEmail: userEmail,
                }).returning()
                userCart = newUserCart
            }

            const existingItem = await tx.query.cartItemsTable.findFirst({
                where: and(
                    eq(cartItemsTable.cartId, userCart.id),
                    eq(cartItemsTable.productId, productData.productId),
                    eq(cartItemsTable.color, productData.color),
                    eq(cartItemsTable.size, productData.size)
                )
            })
            if (existingItem) {
                await tx.update(cartItemsTable).set({ quantity: existingItem.quantity + 1 }).where(eq(cartItemsTable.id, existingItem.id))
            } else {
                await tx.insert(cartItemsTable).values({
                    cartId: userCart.id,
                    productId: productData.productId,
                    quantity: productData.quantity,
                    color: productData.color,
                    size: productData.size,
                    name: productData.name,
                    price: productData.price,
                    image: productData.image
                })
            }
            revalidateTag("cart-data")
            return { success: true };
        })
    } catch (error) {
        console.error("Cart Action Error:", error);
        return { success: false, error: "Failed to add item" };
    }
}
