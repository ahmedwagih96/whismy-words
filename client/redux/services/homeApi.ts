import { PostType } from "@/typings/mongoTypes";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getSession } from "next-auth/react";

type FetchedPosts = {
    posts :PostType[],
    postsCount: number
}
export const homeApi = createApi({
  reducerPath: "homeApi",
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
  tagTypes: ["Posts"],
  endpoints: (builder) => ({
    getPostsBySearchParams: builder.query<
    FetchedPosts,
      { category: string; limit: string; sort: string; pageNumber: string }
    >({
      query: ({ category, limit, sort, pageNumber }) =>
        `/api/posts/?category=${category}&limit=${limit}&sort=${sort}&pageNumber=${pageNumber}`,
      providesTags: ["Posts"],
    }),
    createPost: builder.mutation({
      query: (formData) => ({
        url: `/api/posts`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Posts"],
    }),
  }),
});

export const { useGetPostsBySearchParamsQuery, useCreatePostMutation } =
  homeApi;
