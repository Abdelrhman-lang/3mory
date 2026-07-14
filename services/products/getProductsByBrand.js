import { db } from "@/config/db/db";
import { productsTable } from "@/config/db/schema";
import { eq } from "drizzle-orm";

export async function getProductsByBrand(brand) {
  const productsByBrand = await db
    .select()
    .from(productsTable)
    .where(eq(productsTable.brand, brand));

  return productsByBrand;
}
