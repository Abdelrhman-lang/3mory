"use server";
import { db } from "@/config/db/db";
import { orderTable } from "@/config/db/schema";
import { asc, desc, eq } from "drizzle-orm";

export async function getOrders() {
  try {
    const orders = await db
      .select()
      .from(orderTable)
      .orderBy(asc(orderTable.createdAt));
    return { success: true, orders };
  } catch (error) {
    console.error("Error fetching orders:", error);
    return { success: false, error: "Failed to fetch orders" };
  }
}

export async function updateOrderStatus(orderId, newStatus) {
  try {
    if (!orderId || !newStatus) {
      return { success: false, error: "Order ID and new status are required" };
    }
    await db
      .update(orderTable)
      .set({
        status: newStatus,
      })
      .where(eq(orderTable.id, Number(orderId)));
    return { success: true, message: "Order status updated successfully" };
  } catch (error) {
    console.error("Error updating order status:", error);
    return { success: false, error: "Failed to update order status" };
  }
}
