"use server";
import { db } from "@/config/db/db";
import { sizesTable } from "@/config/db/schema";
import { eq } from "drizzle-orm";

export async function deleteSize(sizeId) {
  try {
    if (!sizeId) {
      return {
        success: false,
        message: "Size ID is required",
      };
    }

    const result = await db
      .delete(sizesTable)
      .where(eq(sizesTable.id, Number(sizeId)))
      .returning();

    return {
      success: true,
      message: "Size deleted successfully",
      result: result[0],
    };
  } catch (error) {
    console.error("Error deleting size:", error);
    return { success: false, message: "Failed to delete size" };
  }
}
