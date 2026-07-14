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
        </div>
      </div>
    </div>
  );
}
