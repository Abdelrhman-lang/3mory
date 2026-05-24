import { db } from "@/config/db/db"
import { cartTable, orderItemsTable, orderTable, productsTable } from "@/config/db/schema"
import { eq, sql } from "drizzle-orm"
import { NextResponse } from "next/server"

export async function POST(req) {
    try {
        const body = await req.json()
        const { userEmail, items, totalPrice, note } = body

        if (!userEmail || !items || items.length === 0) {
            return NextResponse.json({ error: "Missing required data" }, { status: 400 })
        }


        const [order] = await db.insert(orderTable).values({
            userEmail,
            totalPrice,
            status: "pending",
            note: note || null
        }).returning({ insertedId: orderTable.id })

        const orderId = order.insertedId

        const orderItems = items.map((item) => ({
            orderId: orderId,
            productId: item.productId,
            productName: item.name,
            color: item.colorValue,
            size: item.size,
            price: item.price,
            quantity: item.quantity,
            image: item.colorImage
        }))

        await db.insert(orderItemsTable).values(orderItems)



        await db.delete(cartTable).where(eq(cartTable.userEmail, userEmail))

        return NextResponse.json({
            success: true,
            message: "Order created and stock updated successfully",
            orderId
        }, { status: 201 });
    } catch (error) {
        console.error("CREATE_ORDER_AND_UPDATE_STOCK_ERROR", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}