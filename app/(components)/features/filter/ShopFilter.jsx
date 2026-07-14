import React from "react";
import FilterByPrice from "./filter-by-price/FilterByPrice";
import FilterByCategories from "./filter-by-categories/FilterByCategories";
import FilterByBrand from "./filter-by-brand/FilterByBrand";
import { getProductsBrand } from "@/services/products/getProductsBrands";

export default function ShopFilter({ products }) {
  return (
    <div className="pb-24">
      <FilterByPrice />
      <FilterByCategories />
      <FilterByBrand />
      {/* <FilterByColor />
            <FilterBySize /> */}
    </div>
  );
}
