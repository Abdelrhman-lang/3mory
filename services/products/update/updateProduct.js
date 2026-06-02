"use server";
import { db } from "@/config/db/db";
import { productsTable } from "@/config/db/schema";
import { eq } from "drizzle-orm";

export async function updateProduct(productId, updatedData) {
  try {
    if (!productId) {
      return { success: false, message: "Product ID is required" };
    }

    const result = await db
      .update(productsTable)
      .set({
        name: updatedData.name,
        category: updatedData.category,
        newPrice: updatedData.price,
      })
      .where(eq(productsTable.id, Number(productId)))
      .returning();

    return {
      success: true,
      message: "Product updated successfully",
      result,
    };
  } catch (error) {
    console.error("Error updating product:", error);
    return { success: false, message: "Failed to update product" };
  }
}
