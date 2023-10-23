"use client";
import useFilters from "@/hooks/useFilters";
import { Categories, SelectBox } from "@/components";
import { limitOptions, sortOptions } from "@/constants";
import { XCircleIcon } from "@heroicons/react/24/solid";
function Sidebar() {
  const {
    category,
    setCategory,
    limit,
    setLimit,
    setSort,
    sort,
    clearFilters,
  } = useFilters();
  return (
    <div className="filters">
      <form className="filters__form">
        <SelectBox
          title="Sort"
          setValue={setSort}
          value={sort}
          options={sortOptions}
        />
        <Categories category={category} setCategory={setCategory} />
        <SelectBox
          title="Posts per page"
          setValue={setLimit}
          value={limit}
          options={limitOptions}
        />
        <XCircleIcon className="filters__clear-btn" onClick={clearFilters} />
      </form>
    </div>
  );
}

export default Sidebar;
