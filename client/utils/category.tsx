import { request } from "./request";

// Fetch All Categories {SSR}
export async function fetchAllCategories() {
    try {
      const { data } = await request.get(`/api/category`);
      return data;
    } catch (error: any) {
      const message = `${error.response.status} - ${error.response.data.message}`;
      throw new Error(message);
    }
  }