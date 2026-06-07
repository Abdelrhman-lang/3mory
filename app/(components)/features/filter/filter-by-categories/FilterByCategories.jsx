"use client";
import { useRouter, useSearchParams } from "next/navigation";
import FilterHeader from "../filter-header/FilterHeader";
import { useEffect, useState } from "react";
import { getProductCategory } from "@/services/products/getProductsCategory";

export default function FilterByCategories() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await getProductCategory();
        if (res) {
          setCategories(res.categories);
        }
      } catch (error) {
        console.error("Error Fetching Categorie", error);
      }
    };
    fetchCategories();
  }, []);

  const handelFilter = (category) => {
    const params = new URLSearchParams(searchParams);

    const currentCategory = params.get("category");
    if (currentCategory === category) {
      params.delete("category", category);
    } else {
      params.set("category", category);
    }
    params.set("page", "1");
    router.push(`?${params.toString()}`, { scroll: false });
  };
  return (
    <div className="mt-12">
      <FilterHeader title={"Product Categories"} />
      <div>
        <ul className="flex flex-col gap-3">
          {categories.map((category) => {
            return (
              <li
                className="flex items-center justify-between cursor-pointer group"
                key={category}
                onClick={() => handelFilter(category.name)}
              >
                <p
                  className={`text-sm ${searchParams.get("category") === category.name ? "text-secondary font-medium" : "text-primary"} capitalize transition-colors duration-200 group-hover:text-secondary`}
                >
                  {category.name}
                </p>
                <div className="w-[30px] h-[30px] bg-[#EBEBEB] text-[#c3c3c3] rounded-full flex items-center justify-center text-sm transition-colors duration-200 group-hover:bg-secondary group-hover:text-white">
                  {category.count}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
