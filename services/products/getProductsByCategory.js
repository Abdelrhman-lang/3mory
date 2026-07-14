"use server";

import { db } from "@/config/db/db";
import { productsTable } from "@/config/db/schema";
import { eq } from "drizzle-orm";

export async function getProductsByCategory(category) {
  try {
    const productsByCategory = await db.query.productsTable.findMany({
      limit: 10,
      where: eq(productsTable.category, category),
      with: {
        sizes: {
          with: {
            colors: true,
          },
        },
      },
    });
    return { success: true, productsByCategory };
  } catch (error) {
    console.error("Error Get Products By Category", error);
    return { success: false, message: "unable to get products by category" };
  }
}
