"use server";
import { db } from "@/config/db/db";
export async function getProducts() {
  return await db.query.productsTable.findMany({
    with: {
      sizes: {
        with: {
          colors: true,
        },
      },
    },
  });
}
