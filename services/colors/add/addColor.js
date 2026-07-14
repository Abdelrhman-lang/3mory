"use server";
import { db } from "@/config/db/db";
import { colorsTable } from "@/config/db/schema";
import { and, eq } from "drizzle-orm";

export async function addColor(colorData, sizeId, image) {
  try {
    if (!colorData || !sizeId)
      return { success: false, message: "Color Data and Size Id are required" };

    const existingColor = await db
      .select()
      .from(colorsTable)
      .where(
        and(
          eq(colorsTable.sizeId, Number(sizeId)),
          eq(colorsTable.colorName, colorData.name.toLowerCase()),
        ),
      );

    if (existingColor.length > 0)
      return { success: false, message: "This Color already exist" };

    const result = await db
      .insert(colorsTable)
      .values({
        sizeId: sizeId,
        colorName: colorData.name,
        colorQuantity: colorData.quantity,
        colorImage: image,
      })
      .returning();

    return {
      success: true,
      message: "Color Added Successfully",
      result: result[0],
    };
  } catch (error) {
    console.error("Faild to Add Color", error);
    return { success: false, message: "Unable to Add this Color" };
  }
}
