"use server";

import { db } from "@/config/db/db";
import { productsTable } from "@/config/db/schema";
import { ilike } from "drizzle-orm";

export async function searchProducts(query) {
  if (!query || query.trim === "") return [];

  try {
    const result = await db
      .select()
      .from(productsTable)
      .where(ilike(productsTable.name, `%${query}%`))
      .limit(8);
    return { success: true, result };
  } catch (error) {
    console.error("Error fetching products:", error);
    return { success: false };
  }
}
