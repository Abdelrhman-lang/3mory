"use server";
import { db } from "@/config/db/db";
import { sizesTable } from "@/config/db/schema";
import { and, eq } from "drizzle-orm";

export async function addSize(sizeValue, productId) {
  try {
    if (!sizeValue || !productId) {
      return {
        success: false,
        message: "Size value and product ID are required",
      };
    }
    const existingSize = await db
      .select()
      .from(sizesTable)
      .where(
        and(
          eq(sizesTable.productId, Number(productId)),
          eq(sizesTable.sizeValue, sizeValue),
        ),
      );

    if (existingSize.length > 0) {
      return {
        success: false,
        message: "Size already exists for this product",
      };
    }
    const result = await db
      .insert(sizesTable)
      .values({
        sizeValue: sizeValue,
        productId: productId,
      })
      .returning();

    return {
      success: true,
      message: "Size added successfully",
      result: result[0],
    };
  } catch (error) {
    console.error("Error adding size:", error);
    return { success: false, message: "Failed to add size" };
  }
}
