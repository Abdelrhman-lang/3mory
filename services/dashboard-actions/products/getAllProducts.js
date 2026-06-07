"use server";
import { db } from "@/config/db/db";

export async function getAllProducts() {
  try {
    const products = await db.query.productsTable.findMany({
      with: {
        sizes: {
          with: {
            colors: true,
          },
        },
      },
    });
    return { success: true, products };
  } catch (error) {
    console.error("Error Get Products", error);
    return { success: false, message: "unable to get products" };
  }
}
