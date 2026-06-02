"use server";
import { db } from "@/config/db/db";
import { productsTable } from "@/config/db/schema";
import { eq } from "drizzle-orm";

export async function deleteProduct(productId) {
  try {
    if (!productId) {
      return { success: false, message: "Product ID is required" };
    }

    const result = await db
      .delete(productsTable)
      .where(eq(productsTable.id, Number(productId)))
      .returning();

    return {
      success: true,
      message: "Product deleted successfully",
      result,
    };
  } catch (error) {
    console.error("Error deleting product:", error);
    return { success: false, message: "Failed to delete product" };
  }
}
