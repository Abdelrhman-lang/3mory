"use server"
import { db } from "@/config/db/db"
import { orderItemsTable } from "@/config/db/schema"
import { eq } from "drizzle-orm"

export async function getUserOrderItems(orderId) {
    try {
        if (!orderId) return null

        const orderItems = await db.select().from(orderItemsTable).where(eq(orderItemsTable.orderId, orderId))

        return orderItems.length > 0 ? orderItems : null
    } catch (err) {
        console.error("Faild To Get Order Items: ", err)
        return null
    }
}