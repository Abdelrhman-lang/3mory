"use server";
import { db } from "@/config/db/db";
import { productsTable } from "@/config/db/schema";
import { sql } from "drizzle-orm";

export async function getProductCategory() {
  try {
    const categoryResult = await db
      .select({
        category: productsTable.category,
        count: sql`count(*)`.mapWith(Number),
      })
      .from(productsTable)
      .groupBy(productsTable.category);

    const categories = categoryResult
      .filter((item) => item.category)
      .map((item) => ({
        name: item.category,
        count: item.count,
      }));
    return { success: true, categories };
  } catch (error) {
    console.error("Error fetching categories:", error);
    return { success: false, categories: [] };
  }
}
