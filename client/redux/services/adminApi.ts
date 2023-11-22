import {
  CategoryType,
  CommentType,
  PostType,
  UserType,
} from "@/typings/mongoTypes";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getSession } from "next-auth/react";
export const adminApi = createApi({
  reducerPath: "adminApi",
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
  tagTypes: ["Posts", "Users", "Categories", "Comments"],
  endpoints: (builder) => ({
    fetchAllPosts: builder.query<PostType[], null>({
      query: () => `/api/posts/all-posts`,
      providesTags: ["Posts"],
    }),
    fetchPostsCount: builder.query<number, null>({
      query: () => `/api/posts/count`,
    }),
    deletePost: builder.mutation({
      query: (id) => ({
        url: `/api/posts/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Posts"],
    }),
    fetchAllUsers: builder.query<UserType[], null>({
      query: () => `/api/users/all`,
      providesTags: ["Users"],
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/api/users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Posts"],
    }),
    fetchAllComments: builder.query<CommentType[], null>({
      query: () => `/api/comments/`,
      providesTags: ["Comments"],
    }),
    deleteComment: builder.mutation({
      query: (id) => ({
        url: `/api/comments/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Comments"],
    }),
    fetchAllCategories: builder.query<CategoryType[], null>({
      query: () => `/api/category/`,
      providesTags: ["Categories"],
    }),
    addCategory: builder.mutation({
      query: (title) => ({
        url: "/api/category/",
        method: "POST",
        body: { title },
      }),
      invalidatesTags: ["Categories"],
    }),
    deleteCategory: builder.mutation({
      query: (id) => ({
        url: `/api/category/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Categories"],
    }),
  }),
});

export const {
  useFetchAllPostsQuery,
  useFetchAllCategoriesQuery,
  useFetchAllCommentsQuery,
  useFetchAllUsersQuery,
  useFetchPostsCountQuery,
  useAddCategoryMutation,
  useDeleteCategoryMutation,
  useDeleteCommentMutation,
  useDeletePostMutation,
  useDeleteUserMutation,
} = adminApi;
