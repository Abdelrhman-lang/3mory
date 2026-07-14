import { getProductsForPagination } from "@/services/products/getProductsForPagination";
import ShopClient from "./shop-client/ShopClient";

export default async function page({ searchParams }) {
  const params = await searchParams;

  // pagination
  const currentPage = Number(params?.page) || 1;
  const itemsPerPage = 9;

  // call products

  // selected Filter
  const selectedBrand = params?.brand;
  const selectedCategory = params?.category;
  const { products, totalPages } = await getProductsForPagination(
    currentPage,
    itemsPerPage,
    selectedBrand,
    selectedCategory,
  );
  // Filter Depend on Filter
  let filterProducts = [...products];

  if (selectedBrand) {
    filterProducts = products.filter((p) => p.brand === selectedBrand);
  }
  if (selectedCategory) {
    filterProducts = filterProducts.filter(
      (p) => p.category === selectedCategory,
    );
  }
  return (
    <ShopClient
      products={filterProducts}
      allProducts={products}
      currentPage={currentPage}
      totalPages={totalPages}
    />
  );
}
