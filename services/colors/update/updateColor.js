"use server";

import { db } from "@/config/db/db";
import { colorsTable } from "@/config/db/schema";
import { eq } from "drizzle-orm";

export async function updateColor(colorId, colorData) {
  try {
    if (!colorId || !colorData) {
      return {
        success: false,
        message: "Color Id and Color Data are required",
      };
    }

    const result = await db
      .update(colorsTable)
      .set({
        colorName: colorData.name,
        colorQuantity: colorData.quantity,
      })
      .where(eq(colorsTable.id, Number(colorId)))
      .returning();

    return { success: true, message: "Color Updated Succssfully", result };
  } catch (error) {
    console.error("Faild to Update Color", error);
    return { success: false, message: "Unable To Update Color" };
  }
}
