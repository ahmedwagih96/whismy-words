import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getSession } from "next-auth/react";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_URL,
    prepareHeaders: async (headers) => {
      const session = await getSession();
      if (session?.user) {
        headers.set("Authorization", `Bearer ${session.user.token}`);
        return headers;
      }
    },
  }),
  tagTypes: ["Posts", "Post", "Users", "Categories", "Comments", 'User'],
  endpoints: () => ({}),
});
