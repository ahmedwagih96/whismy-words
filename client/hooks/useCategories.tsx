"use client";
import { useEffect, useState } from "react";
import { fetchAllCategories } from "@/utils/category";
import { CategoryType } from "@/typings/mongoTypes";

function useCategories() {
  const [categories, setAllCategories] = useState<CategoryType[]>([]);
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    let result: CategoryType[] = await fetchAllCategories();
    setAllCategories(result);
  };

  return {
    categories,
  };
}

export default useCategories;
