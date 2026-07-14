<<<<<<< HEAD
"use client";
import { CiSearch } from "react-icons/ci";
import SearchQuery from "./SearchQuery";
import { useState } from "react";

export default function Search() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="hidden lg:block lg:w-1/3">
      <div className="py-1 relative">
        <SearchQuery
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
        <div className="flex items-center px-4 border rounded-[5px]">
          <input
            className="w-4/4 text-sm py-2 placeholder:text-sm focus:outline-0"
            placeholder="Search for any product"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
            }}
          />
          <CiSearch size={18} />
=======
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
>>>>>>> 755ef83bb689f640a514a8d88e422abd6cfbca22
        </div>
      </div>
    </div>
  );
}
