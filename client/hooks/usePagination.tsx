import { useEffect, useMemo, useState } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

function usePagination(postsCount: number) {
  const router = useRouter();
  const params = useSearchParams();
  const pathname = usePathname();
  const [firstMount, setFirsMount] = useState<boolean>(true);
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

  useEffect(() => {
    const current = new URLSearchParams(Array.from(params.entries()));
    if (!firstMount) {
      current.set("pageNumber", currentPage.toString());
      const query = current.toString();
      router.push(`${pathname}?${query}`);
    }
    if (firstMount) setFirsMount(false);
  }, [currentPage]);

  return {
    setCurrentPage,
    paginationButtons,
    currentPage,
    paginationCount,
  };
}

export default usePagination;
