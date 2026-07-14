"use client";
import { useState } from "react";
import { FaCaretDown, FaCaretUp } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import ShopFilter from "@/app/(components)/features/filter/ShopFilter";
import Pagenation from "@/app/(components)/features/pagenation/Pagenation";
import ProductsDisplay from "@/app/(components)/features/product/products-display/ProductsDisplay";
import BreadcrumbBasic from "@/app/(components)/shared/breadcrumb/BreadcrumbBasic";
import ShopHeader from "@/app/(components)/ui/shop-header/ShopHeader";
export default function ShopClient({
  products,
  allProducts,
  currentPage,
  totalPages,
}) {
  const [isFiltersActive, setIsFiltersActive] = useState(false);
  const [gridOption, setGridOption] = useState("grid3");
  const handleSort = (value) => {
    console.log("Sort by:", value);
  };
  return (
    <section>
      <div className="custom-container">
        <BreadcrumbBasic page="Shop" />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-10">
          <div className="flex items-center justify-between lg:hidden border-b pb-4">
            <h3 className="text-xl text-primary font-bold">Filters</h3>
            <button onClick={() => setIsFiltersActive(!isFiltersActive)}>
              {isFiltersActive ? (
                <FaCaretUp size={22} />
              ) : (
                <FaCaretDown size={22} />
              )}
            </button>
          </div>
          <aside className={`lg:col-span-3`}>
            <div className="hidden lg:block">
              <ShopFilter products={allProducts} />
            </div>
            <AnimatePresence>
              {isFiltersActive && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="overflow-hidden lg:hidden"
                >
                  <div className="py-5 border-b mb-5">
                    <ShopFilter products={allProducts} />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </aside>
          <div className="lg:col-span-9 pb-24">
            <ShopHeader
              onSortChange={handleSort}
              gridOption={gridOption}
              setGridOption={setGridOption}
              products={products}
            />
            <ProductsDisplay gridOption={gridOption} products={products} />
            <Pagenation
              currentPage={currentPage}
              totalPages={totalPages}
              page={"shop"}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
