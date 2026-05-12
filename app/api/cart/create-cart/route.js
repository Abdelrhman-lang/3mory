import { db } from "@/config/db/db";
import { cartItemsTable, cartTable } from "@/config/db/schema";
import { and, eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const {
            userEmail,
            productId,
            name,
            price,
            image,
            quantity,
            colorImage,
            colorValue,
            size,
        } = await req.json();

        let [cart] = await db
            .select()
            .from(cartTable)
            .where(eq(cartTable.userEmail, userEmail));

        if (!cart) {
            const [newCart] = await db
                .insert(cartTable)
                .values({
                    userEmail,
                })
                .returning();
            cart = newCart;
        }

        const existingItem = await db
            .select()
            .from(cartItemsTable)
            .where(
                and(
                    eq(cartItemsTable.cartId, cart.id), // تم إصلاح الخطأ هنا
                    eq(cartItemsTable.productId, Number(productId)),
                    eq(cartItemsTable.colorValue, colorValue), // مقارنة اللون
                    eq(cartItemsTable.size, size)    // مقارنة المقاس
                )
            );
        if (existingItem.length > 0) {
            // ممنوع نعمل update → نرجع error
            return NextResponse.json(
                { error: "Product already exists in cart" },
                { status: 400 }
            );
        }
        const [inserted] = await db
            .insert(cartItemsTable)
            .values({
                cartId: cart.id,
                productId,
                name,
                price,
                image,
                quantity,
                colorImage,
                colorValue,
                size,
            })
            .returning();

        return NextResponse.json(inserted);
    } catch (err) {
        console.error("Error adding to cart :", err);
        return NextResponse.json(
            { error: "Error adding to cart" },
            { status: 500 }
        );
    }
}