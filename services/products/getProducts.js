"use server";

import { db } from "@/config/db/db";

export async function getProducts() {
  try {
    const products = db.query.productsTable.findMany({
      limit: 8,
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
    return {
      success: false,
      message: "unable to get products",
    };
  }
}
