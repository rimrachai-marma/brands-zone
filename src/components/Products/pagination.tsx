"use client";

import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";

interface Props {
  page: number;
  pages: number;
}

const Pagination: React.FC<Props> = ({ page = 8, pages = 35 }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handlePageChange = (newPage: number) => {
    let actionRoute = "/products";

    // Get all existing query parameters
    const params = new URLSearchParams(searchParams.toString());

    // Update or remove the page parameter
    if (newPage !== 1) {
      params.set("page", newPage.toString());
    } else {
      params.delete("page");
    }

    const queryString = params.toString();

    if (queryString) {
      actionRoute += "?" + queryString;
    }

    router.push(actionRoute);
  };

  const pageNumbers = [];

  for (let i = page - 3; i <= page + 3; i++) {
    if (i < 1) continue;
    if (i > pages) break;

    pageNumbers.push(i);
  }

  const showFirstPage = pageNumbers[0] > 1;
  const showLastPage = pageNumbers[pageNumbers.length - 1] < pages;
  const showFirstEllipsis = pageNumbers[0] > 2;
  const showLastEllipsis = pageNumbers[pageNumbers.length - 1] < pages - 1;

  return (
    pages > 1 && (
      <div className="flex items-center justify-center gap-2 my-8">
        {/* Previous Button */}
        <Button
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
          variant="outline"
          size="sm"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Previous</span>
        </Button>

        {/* First Page */}
        {showFirstPage && (
          <>
            <Button
              onClick={() => handlePageChange(1)}
              variant="outline"
              size="sm"
            >
              1
            </Button>
            {showFirstEllipsis && (
              <span className="px-2 text-gray-500">...</span>
            )}
          </>
        )}

        {/* Page Number Buttons */}
        {pageNumbers.map((pageNumber) => (
          <Button
            onClick={() => handlePageChange(pageNumber)}
            key={pageNumber}
            disabled={page === pageNumber}
            variant={page === pageNumber ? "secondary" : "outline"}
            size="sm"
          >
            {pageNumber}
          </Button>
        ))}

        {/* Last Page */}
        {showLastPage && (
          <>
            {showLastEllipsis && (
              <span className="px-2 text-gray-500">...</span>
            )}
            <Button
              onClick={() => handlePageChange(pages)}
              variant="outline"
              size="sm"
            >
              {pages}
            </Button>
          </>
        )}

        {/* Next Button */}
        <Button
          onClick={() => handlePageChange(page + 1)}
          disabled={page === pages}
          variant="outline"
          size="sm"
        >
          <span>Next</span>
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
    )
  );
};

export default Pagination;
