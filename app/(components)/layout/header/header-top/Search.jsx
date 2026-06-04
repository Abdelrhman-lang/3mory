import React from "react";

import { Input } from "@/components/ui/input";
import { CiSearch } from "react-icons/ci";
import { CategoryList } from "@/app/(components)/ui/category-list/CategoryList";

export default function Search() {
  return (
    <div className="hidden lg:block lg:w-1/3">
      <div className="border flex items-center rounded-full">
        <div className="px-3 py-2 h-full bg-[#f6f6f6] rounded-l-full">
          <CategoryList />
        </div>
        <div className="flex-1 flex items-center px-4">
          <input
            className="w-4/4 text-sm py-2 placeholder:text-sm focus:outline-0"
            placeholder="Search for Any Product"
          />
          <CiSearch size={23} />
        </div>
      </div>
    </div>
  );
}
