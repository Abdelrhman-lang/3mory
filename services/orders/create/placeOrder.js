"use server";
import { db } from "@/config/db/db";
import {
  cartTable,
  orderItemsTable,
  orderTable,
  productsTable,
  usersTable,
} from "@/config/db/schema";
import { sendTelegramOrderAlert } from "@/services/notifications/telegram";
import { eq, sql } from "drizzle-orm";

export async function placeOrder({
  userEmail,
  items,
  totalPrice,
  note,
  phoneNumber,
  address,
}) {
  let orderId = null;

  try {
    if (!userEmail) {
      throw new Error("User email is required to place an order.");
    }

    if (!items || items.length === 0) {
      throw new Error("No items in the cart to place an order.");
    }

    await db.transaction(async (tx) => {
      // check the quantity of each product in the order
      for (const item of items) {
        const [dbProduct] = await tx
          .select({
            name: productsTable.name,
            quantity: productsTable.quantity,
          })
          .from(productsTable)
          .where(eq(productsTable.id, item.productId));

        if (!dbProduct) {
          throw new Error(`Product "${item.name}" no longer exists.`);
        }
        if (dbProduct.quantity < item.quantity) {
          throw new Error(
            `Sorry, "${dbProduct.name}" is out of stock. Only ${dbProduct.quantity} items left.`,
          );
        }
      }

      // update user data
      const updatedUser = await tx
        .update(usersTable)
        .set({
          phoneNumber: phoneNumber,
          address: address,
        })
        .where(eq(usersTable.email, userEmail))
        .returning();

      // 🔥 التصليح هنا: الـ Rollback بيرمي إيرور أوتوماتيك فبلاش تعمل وراه return
      if (!updatedUser || updatedUser.length === 0) {
        throw new Error("Failed to update user details. Rolling back.");
      }

      // create order
      const [order] = await tx
        .insert(orderTable)
        .values({
          userEmail,
          totalPrice,
          status: "pending",
          note: note || null,
        })
        .returning({ insertedId: orderTable.id });

      orderId = order.insertedId; // بنخزن الـ ID في المتغير الخارجي

      const orderItems = items.map((item) => ({
        orderId: orderId,
        productId: item.productId,
        productName: item.name,
        color: item.colorValue,
        size: item.size,
        price: item.price,
        quantity: item.quantity,
        image: item.colorImage,
      }));

      await tx.insert(orderItemsTable).values(orderItems);
      await tx.delete(cartTable).where(eq(cartTable.userEmail, userEmail));

      for (const item of items) {
        await tx
          .update(productsTable)
          .set({
            quantity: sql`${productsTable.quantity} - ${item.quantity}`,
          })
          .where(eq(productsTable.id, item.productId));
      }
    });

    // 2️⃣ 🔥 طالما الـ الكود وصل للسطر ده، يبقا الـ Transaction نجحت 100% بدون أي إيرورز
    const orderPayload = {
      id: orderId,
      userEmail: userEmail,
      totalPrice: totalPrice,
      phoneNumber: phoneNumber,
    };

    try {
      await sendTelegramOrderAlert(orderPayload);
    } catch (telError) {
      console.error(
        "Telegram Notification Error (Order is safe though):",
        telError,
      );
    }

    return {
      success: true,
      message: "Order created successfully",
      orderId,
    };
  } catch (error) {
    console.error("PLACE_ORDER_ERROR", error);
    // كدة الـ catch هيرمي رسالة الإيرور الحقيقية اللي حصلت جوة بأمان ومن غير تضارب
    return {
      success: false,
      message: error.message || "Failed to place order.",
    };
  }
}
