import { SearchParamsType } from "@/typings/types";

// Fetch Posts Based on Queries
export async function fetchPosts({ category, limit, sort, pageNumber }: SearchParamsType) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/posts?category=${category}&limit=${limit}&sort=${sort}&pageNumber=${pageNumber}`
    );
    const data = await res.json();
    return data;
  } catch (error: any) {
    const message = `${error.response.status} - ${error.response.data.message}`;
    throw new Error(message);
  }
}
