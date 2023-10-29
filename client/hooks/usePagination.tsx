import { useEffect, useMemo, useState } from "react";
import { useSearchParams, usePathname } from "next/navigation";

function usePagination(postsCount: number) {
  const params = useSearchParams();
  const pathname = usePathname();
  const [currentPage, setCurrentPage] = useState<number>(
    Number(params.get("pageNumber")) || 1
  );
  const [limit, setLimit] = useState<number>(Number(params.get("limit")) || 3);
  useEffect(() => {
    setLimit(Number(params.get("limit") || 3));
  }, [params]);

  const paginationCount = Math.ceil(postsCount / limit);

  const paginationButtons = useMemo(() => {
    let pages: number[] = [];
    for (let i = 1; i <= paginationCount; i++) {
      pages.push(i);
    }
    return pages;
  }, [postsCount, limit]);

  const getPath = (page: number) => {
    const current = new URLSearchParams(Array.from(params.entries()));
    current.set("pageNumber", page.toString());
    const query = current.toString();
    return `${pathname}?${query}`;
  };

  return {
    getPath,
    setCurrentPage,
    paginationButtons,
    currentPage,
    paginationCount,
  };
}

export default usePagination;
