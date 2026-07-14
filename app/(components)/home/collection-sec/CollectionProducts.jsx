"use client";

import { useEffect, useState, useTransition } from "react";
import SwiperGrid from "./SwiperGrid";
import SectionTitle from "../../ui/sec-title/SectionTitle";
import { getProductCategory } from "@/services/products/getProductsCategory";
import { getProductsByCategory } from "@/services/products/getProductsByCategory";
import { Spinner } from "@/components/ui/spinner";

export default function CollectionProducts({ title, text }) {
  const [activeCat, setActiveCat] = useState("shoes");
  const [categories, setCategories] = useState([]);
  const [productsForDisplay, setProductsForDisplay] = useState([]);
  const [isPending, startTransition] = useTransition();
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await getProductCategory();
        if (res.success) {
          setCategories(res.categories);
        }
      } catch (error) {
        console.error("Error Fetching Categories", error);
      }
    };
    fetchCategories();
  }, []);
  useEffect(() => {
    if (!activeCat) return;
    startTransition(async () => {
      try {
        const res = await getProductsByCategory(activeCat);
        if (res.success) {
          setProductsForDisplay(res.productsByCategory);
        }
      } catch (error) {
        console.error("Error Fetching Products", error);
      }
    });
  }, [activeCat]);
  return (
    <div>
      <SectionTitle title={title} text={text} />

      <ul className="flex items-center justify-center gap-8 mb-8">
        {categories.map((category) => {
          return (
            <li
              key={category.name}
              className={`text-sm cursor-pointer capitalize ${activeCat === category.name ? "text-secondary" : "text-primary"}`}
              onClick={() => setActiveCat(category.name)}
            >
              {category.name}
            </li>
          );
        })}
      </ul>
      {isPending ? (
        <div className="flex items-center justify-center h-64">
          <Spinner className={"size-10"} />
        </div>
      ) : (
        <div>
          <SwiperGrid products={productsForDisplay} />
        </div>
      )}
    </div>
  );
}
