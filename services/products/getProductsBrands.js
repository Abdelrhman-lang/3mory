"use server";
import { db } from "@/config/db/db";
import { productsTable } from "@/config/db/schema";
import { sql } from "drizzle-orm";

export async function getProductsBrand() {
  try {
    const brandsResult = await db
      .select({
        brand: productsTable.brand,
        count: sql`count(*)`.mapWith(Number),
      })
      .from(productsTable)
      .groupBy(productsTable.brand);

    const brands = brandsResult
      .filter((item) => item.brand)
      .map((item) => ({
        name: item.brand,
        count: item.count,
      }));
    return { success: true, brands };
  } catch (error) {
    console.error("Error fetching brands:", error);
    return { success: false, brands: [] };
  }
}
