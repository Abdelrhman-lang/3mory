import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function TablePagination({
  currentPage,
  totalPages,
  onPageChange,
}) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200 bg-gray-50/50">
      <p className="text-sm text-gray-500">
        Page <span className="font-semibold text-gray-900">{currentPage}</span>{" "}
        of <span className="font-semibold text-gray-900">{totalPages}</span>
      </p>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage <= 1}
          className="bg-white border-gray-300"
        >
          <ChevronLeft size={16} className="mr-1" /> Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
          className="bg-white border-gray-300"
        >
          Next <ChevronRight size={16} className="ml-1" />
        </Button>
      </div>
    </div>
  );
}
