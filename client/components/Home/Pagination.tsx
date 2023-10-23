"use client";
import usePagination from "@/hooks/usePagination";

const Pagination = ({ postsCount }: { postsCount: number }) => {
  const { paginationButtons, currentPage, setCurrentPage, paginationCount } =
    usePagination(postsCount);
  return (
    <div className="pagination">
      <button
        disabled={currentPage === 1}
        className="page previous"
        onClick={() => setCurrentPage((prev) => prev - 1)}
      >
        Previous
      </button>
      {paginationButtons.map((page) => (
        <button
          disabled={currentPage === page}
          className={`page ${page === currentPage ? "active" : ""}`}
          key={page}
          onClick={() => setCurrentPage(page)}
        >
          {page}
        </button>
      ))}
      <button
        disabled={currentPage === paginationCount}
        onClick={() => setCurrentPage((prev) => prev + 1)}
        className="page next"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
