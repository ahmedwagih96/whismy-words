"use client";
import usePagination from "@/hooks/usePagination";
import Link from "next/link";
const Pagination = ({ postsCount }: { postsCount: number }) => {
  const {
    paginationButtons,
    currentPage,
    setCurrentPage,
    paginationCount,
    getPath,
  } = usePagination(postsCount);
  return (
    <div className="pagination">
      <Link
        href={getPath(currentPage - 1)}
        className={`page previous ${currentPage === 1 ? "disabled" : ""}`}
        onClick={() => setCurrentPage((prev) => prev - 1)}
      >
        Previous
      </Link>
      {paginationButtons.map((page) => (
        <Link
          href={getPath(page)}
          className={`page ${page === currentPage ? "active" : ""}`}
          key={page}
          onClick={() => setCurrentPage(page)}
        >
          {page}
        </Link>
      ))}
      <Link
        href={getPath(currentPage + 1)}
        onClick={() => setCurrentPage((prev) => prev + 1)}
        className={`page next ${
          currentPage === paginationCount ? "disabled" : ""
        }`}
      >
        Next
      </Link>
    </div>
  );
};

export default Pagination;
