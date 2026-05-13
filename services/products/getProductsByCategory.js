import { db } from "@/config/db/db";
import { productsTable } from "@/config/db/schema";
import { eq } from "drizzle-orm";

export async function getProductsByCategory(category) {

    const productsByCategory = await db.select().from(productsTable).where(eq(productsTable.category, category))

    return productsByCategory;
}