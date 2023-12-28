import { PostType } from "@/typings/mongoTypes";
import { baseApi } from "./baseApi";

type FetchedPosts = {
  posts: PostType[];
  postsCount: number;
};

export const homeApi = baseApi.injectEndpoints({
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
