"use server";
import { db } from "@/config/db/db";
import { productsTable } from "@/config/db/schema";

export async function addProduct(productData, image) {
  try {
    if (!productData)
      return {
        success: false,
        message: "Please Fill All Fields to Add This Product",
      };
    const result = await db
      .insert(productsTable)
      .values({
        name: productData.name,
        description: productData.description,
        brand: productData.brand,
        category: productData.category,
        newPrice: productData.newPrice,
        quantity: productData.quantity,
        image: image,
      })
      .returning();

    return {
      success: true,
      message: "Product Added Successfully",
      result: result[0],
    };
  } catch (error) {
    console.error("Failed to Add This Product", error);
    return { success: false, message: "unable to add this product" };
  }
}
