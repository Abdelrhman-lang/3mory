import { db } from "@/config/db/db";
import { cartItemsTable, cartTable } from "@/config/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url)
        const userEmail = searchParams.get("userEmail")

        if (!userEmail) return NextResponse.json({ error: "Email required" }, { status: 400 });

        const [cart] = await db
            .select()
            .from(cartTable)
            .where(eq(cartTable.userEmail, userEmail));

        if (!cart) {
            return NextResponse.json({ cartId: null, items: [] }, { status: 200 });
        }
        const cartItems = await db
            .select()
            .from(cartItemsTable)
            .where(eq(cartItemsTable.cartId, cart.id));

        return NextResponse.json({
            cartId: cart.id,
            items: cartItems,
        });
    } catch (err) {
        console.error("Error getting user cart items :", err);
        return NextResponse.json(
            { error: "Error getting user cart items" },
            { status: 500 }
        );
    }

}