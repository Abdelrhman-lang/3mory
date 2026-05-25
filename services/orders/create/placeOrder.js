"use server"
import { db } from "@/config/db/db"
import { cartTable, orderItemsTable, orderTable, productsTable, usersTable } from "@/config/db/schema"
import { eq, sql } from "drizzle-orm"

export async function placeOrder({ userEmail, items, totalPrice, note, phoneNumber, address }) {
    try {
        if(!userEmail) {
            throw new Error("User email is required to place an order.")
        }

        if(!items || items.length === 0) {
            throw new Error("No items in the cart to place an order.")
        }

        const result = await db.transaction(async(tx)=> {

            // check the quantity of each product in the order
            for (const item of items) {
                const [dbProduct] = await tx.select({
                    name: productsTable.name,
                    quantity: productsTable.quantity
                }).from(productsTable).where(eq(productsTable.id, item.productId))

                if(!dbProduct) {
                    throw new Error(`Product "${item.name}" no longer exists.`);
                }
                if(dbProduct.quantity < item.quantity) {
                    throw new Error(`Sorry, "${dbProduct.name}" is out of stock. Only ${dbProduct.quantity} items left.`);
                }
            }   
            // update user data
            const updatedUser = await tx.update(usersTable).set({
                phoneNumber: phoneNumber,
                address: address,
            }).where(eq(usersTable.email, userEmail)).returning()

            if(!updatedUser || updatedUser.length === 0) {
                tx.rollback()
                return { success: false, message: "Failed to update user details." }
            }

            // create order
            const [order] = await tx.insert(orderTable).values({
                userEmail,
                totalPrice,
                status: "pending",
                note: note || null
            }).returning({ insertedId: orderTable.id })

            const orderId = order.insertedId

            const orderItems = items.map((item)=> ({
                orderId: orderId,
                productId: item.productId,
                productName: item.name,
                color: item.colorValue,
                size: item.size,
                price: item.price,
                quantity: item.quantity,
                image: item.colorImage
                
            }))
            await tx.insert(orderItemsTable).values(orderItems)
            await tx.delete(cartTable).where(eq(cartTable.userEmail, userEmail))
            for (const item of items) {
                await tx
                    .update(productsTable)
                    .set({
                        // تنقيص الكمية الحالية في الداتا بيز - الكمية المطلوبة
                        quantity: sql`${productsTable.quantity} - ${item.quantity}`
                    })
                    .where(eq(productsTable.id, item.productId))
            }

            return { success: true, message: "Order created and stock updated successfully", orderId }
        })
        return result

    } catch (error) {
        console.error("PLACE_ORDER_ERROR", error)
        throw new Error(error.message || "Failed to place order.")
    }
}