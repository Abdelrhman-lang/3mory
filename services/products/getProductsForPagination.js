"use server";
import { db } from "@/config/db/db";
import { productsTable } from "@/config/db/schema";
import { eq, sql } from "drizzle-orm";

export async function getProductsForPagination(
  page = 1,
  limit = 9,
  brand,
  category,
) {
  try {
    const offset = (page - 1) * limit;

    // 1️⃣ تحضير شرط الـ Where: لو فيه براند مبعوت هنفلتر بيه، لو مفيش يبقى undefined (يعني يجيب كله)
    const whereCondition = brand
      ? eq(productsTable.brand, brand)
      : category
        ? eq(productsTable.category, category)
        : undefined;

    // 2️⃣ جلب المنتجات: الفلتر (where) لازم يتنفذ الأول قبل الـ limit والـ offset
    const products = await db.query.productsTable.findMany({
      where: whereCondition, // 🔥 التريكة هنا: الداتابيز هتفصّل المنتجات على البراند ده أولاً
      limit: limit,
      offset: offset,
      orderBy: (products, { asc }) => [asc(products.id)],
      with: {
        sizes: {
          with: {
            colors: true,
          },
        },
      },
    });

    // 3️⃣ حساب توتال الصفحات لبراند Adidas بس مش للمحل كله!
    const totalProductsResult = await db
      .select({ count: sql`count(*)` })
      .from(productsTable)
      .where(whereCondition); // 🔥 لازم الفلتر يتحط هنا كمان

    const totalProducts = Number(totalProductsResult[0]?.count || 0);
    const totalPages = Math.ceil(totalProducts / limit) || 1;

    return {
      success: true,
      products,
      totalPages,
      currentPage: page,
    };
  } catch (error) {
    console.error("Error fetching products:", error);
    return { success: false, products: [], totalPages: 1, currentPage: 1 };
  }
}
