"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function ShopPagination({ totalPages, currentPage, page }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handlePageChange = (pageNumber) => {
    const params = new URLSearchParams(searchParams.toString());

    params.set("page", pageNumber.toString());

    router.push(`/${page}?${params.toString()}`, { scroll: true });
  };

  if (totalPages <= 1) return null;
  return (
    <div className="flex items-center justify-center gap-4 mt-12 py-4">
      {/* زرار الصفحة السابقة */}
      <Button
        variant="outline"
        size="icon"
        className="rounded-full w-10 h-10 border-slate-300 hover:bg-slate-50"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage <= 1}
      >
        <ChevronLeft className="w-5 h-5" />
      </Button>

      <div className="flex items-center gap-2 font-medium text-sm">
        {Array.from({ length: totalPages }, (_, index) => {
          const pageNum = index + 1;
          const isCurrent = pageNum === currentPage;
          return (
            <button
              key={pageNum}
              onClick={() => handlePageChange(pageNum)}
              className={`w-10 h-10 rounded-full transition-all ${
                isCurrent
                  ? "bg-black text-white shadow-md shadow-black/10"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              {pageNum}
            </button>
          );
        })}
      </div>

      <Button
        variant="outline"
        size="icon"
        className="rounded-full w-10 h-10 border-slate-300 hover:bg-slate-50"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
      >
        <ChevronRight className="w-5 h-5" />
      </Button>
    </div>
  );
}
