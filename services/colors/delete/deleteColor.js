"use server";
import { db } from "@/config/db/db";
import { colorsTable } from "@/config/db/schema";
import { eq } from "drizzle-orm";

export async function deleteColor(colorId) {
  try {
    if (!colorId) {
      return { success: false, message: "Color Id is requierd" };
    }

    const result = await db
      .delete(colorsTable)
      .where(eq(colorsTable.id, Number(colorId)))
      .returning();
    return { success: true, message: "Color Deleted Succssfully", result };
  } catch (error) {
    console.error("Faild to Delete Color", error);
    return { success: false, message: "Unable to Delete This Color" };
  }
}
