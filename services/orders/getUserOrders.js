import { db } from "@/config/db/db"
import { orderTable } from "@/config/db/schema"
import { eq } from "drizzle-orm"

export async function getUserOrders(userEmail) {
    try {
        if (!userEmail) return null

        const userOrders = await db.select().from(orderTable).where(eq(orderTable.userEmail, userEmail))

        return userOrders.length > 0 ? userOrders : null
    } catch (err) {
        console.error("Error in get user orders:", err);
        return null;
    }
}