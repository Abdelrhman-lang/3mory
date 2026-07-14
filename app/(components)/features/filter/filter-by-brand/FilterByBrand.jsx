"use client";
import { useRouter, useSearchParams } from "next/navigation";
import FilterHeader from "../filter-header/FilterHeader";
import { useEffect, useState } from "react";
import { getProductsBrand } from "@/services/products/getProductsBrands";

export default function FilterByBrand() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [brands, setBrands] = useState([]);
  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const res = await getProductsBrand();
        if (res) {
          setBrands(res.brands);
        }
      } catch (error) {
        console.error("Error Fetching Brands", error);
      }
    };
    fetchBrands();
  }, []);
  const handelFilter = (brand) => {
    const params = new URLSearchParams(searchParams);

    const currentBrand = params.get("brand");
    if (currentBrand === brand) {
      params.delete("brand", brand);
    } else {
      params.set("brand", brand);
    }
    params.set("page", "1");
    router.push(`?${params.toString()}`, { scroll: false });
  };
  return (
    <div className="mt-12">
      <FilterHeader title={"Filter By Brand"} />
      <div>
        <ul className="flex flex-col gap-3">
          {brands.map((brand) => {
            return (
              <li
                className="flex items-center justify-between cursor-pointer group"
                key={brand}
                onClick={() => handelFilter(brand.name)}
              >
                <p
                  className={`text-sm ${searchParams.get("brand") === brand.name ? "text-secondary" : "text-primary"} capitalize transition-colors duration-200 group-hover:text-secondary`}
                >
                  {brand.name}
                </p>
                <div className="w-[30px] h-[30px] bg-[#EBEBEB] text-[#c3c3c3] rounded-full flex items-center justify-center text-sm transition-colors duration-200 group-hover:bg-secondary group-hover:text-white">
                  {brand.count}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
