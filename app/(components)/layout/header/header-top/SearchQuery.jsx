"use client";
import { searchProducts } from "@/services/products/searchProducts";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
export default function SearchQuery({ searchQuery, setSearchQuery }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (searchQuery.trim === "") {
      setProducts([]);
      return;
    }

    const delayDebounceFn = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await searchProducts(searchQuery);
        if (res.success) {
          setProducts(res.result);
        }
      } catch (error) {
        console.error("Failed to search:", error);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);
  return (
    <div>
      {searchQuery.length > 0 && (
        <div
          className={`absolute w-full bg-white shadow-md left-0 top-11  z-50 rounded-[5px]`}
        >
          <div className="p-3 flex flex-col gap-3">
            {loading ? (
              <div className="text-center py-4 text-sm text-gray-500">
                searching.....
              </div>
            ) : products.length > 0 ? (
              products.map((product) => (
                <Link
                  href={`/product/${product.id}`}
                  onClick={() => setSearchQuery("")}
                >
                  <div
                    key={product.id}
                    className="flex gap-4 border-b pb-2 last:border-b-0 items-center hover:bg-gray-50 p-1 rounded transition-colors cursor-pointer"
                  >
                    <div className="w-15 h-15 relative shrink-0 rounded-lg overflow-hidden border border-gray-100">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <h3 className="text-secondary font-medium text-sm ">
                        {product.name}
                      </h3>
                      <p className="text-sm font-semibold text-primary">
                        {product.brand}
                      </p>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <div className="text-center py-4 text-sm text-gray-500">
                there is nothing match "{searchQuery}"
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
