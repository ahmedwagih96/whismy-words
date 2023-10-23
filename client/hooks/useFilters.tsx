import { useState, useEffect } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

function useFilters() {
  const router = useRouter();
  const params = useSearchParams();
  const pathname = usePathname();

  // STATE
  const [category, setCategory] = useState<string>(
    params.get("category") || ""
  );
  const [limit, setLimit] = useState<string>(params.get("limit") || "");
  const [sort, setSort] = useState<string>(params.get("sort") || "");
  const [firstMount, setFirsMount] = useState<boolean>(true);

  useEffect(() => {
    const current = new URLSearchParams(Array.from(params.entries()));

    if (!firstMount) {
      category ? current.set("category", category) : current.delete("category");
      limit ? current.set("limit", limit) : current.delete("limit");
      sort ? current.set("sort", sort) : current.delete("sort");
      const query = current.toString();
      router.push(`${pathname}?${query}`);
    }

    if (firstMount) setFirsMount(false);
  }, [limit, category, sort]);

  const clearFilters = () => {
    setCategory("");
    setLimit("");
    setSort("");
  };
  return {
    category,
    setCategory,
    limit,
    setLimit,
    sort,
    setSort,
    clearFilters,
  };
}

export default useFilters;
