"use server"

import { db } from "@/config/db/db"
import { cartItemsTable, cartTable } from "@/config/db/schema"
import { and, eq } from "drizzle-orm"

export async function createCart(userEmail, productId, name, price, image, quantity, colorValue, size, colorImage) {
    try {
        if (!userEmail) {
            return { success: false, error: "User email is required" }
        }


        const parsedProductId = Number(productId)

        const result = await db.transaction(async (tx) => {
            
            let [cart] = await tx
                .select()
                .from(cartTable)
                .where(eq(cartTable.userEmail, userEmail))

            if (!cart) {
                const [newCart] = await tx
                    .insert(cartTable)
                    .values({ userEmail: userEmail })
                    .returning()
                cart = newCart
            }

            const existingItems = await tx
                .select()
                .from(cartItemsTable)
                .where(
                    and(
                        eq(cartItemsTable.cartId, cart.id),
                        eq(cartItemsTable.productId, parsedProductId),
                        eq(cartItemsTable.colorValue, colorValue || null),
                        eq(cartItemsTable.size, size || null)
                    )
                )

            if (existingItems.length > 0) {
                return { success: false, error: "Product with the same options already in cart" }
            }


            const [inserted] = await tx
                .insert(cartItemsTable)
                .values({
                    cartId: cart.id,
                    productId: parsedProductId, // مررناه بعد الـ parse لرقم
                    name,
                    price,
                    image,
                    quantity: Number(quantity) || 1,
                    colorImage: colorImage || null,
                    colorValue: colorValue || null,
                    size: size || null,
                })
                .returning()

            return { success: true, item: inserted }
        })

        return result

    } catch (error) {
        console.error("CREATE_CART_ERROR:", error)
        return { success: false, error: error.message || "Failed to create cart item" }
    }
}