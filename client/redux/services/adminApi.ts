import {
  CategoryType,
  CommentType,
  PostType,
  UserType,
} from "@/typings/mongoTypes";
import { baseApi } from "./baseApi";

export const adminApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    fetchAllPosts: builder.query<PostType[], null>({
      query: () => `/api/posts/all-posts`,
      providesTags: ["Posts"],
    }),
    fetchPostsCount: builder.query<number, null>({
      query: () => `/api/posts/count`,
    }),
    deleteAdminPost: builder.mutation({
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
      invalidatesTags: ["Users"],
    }),
    fetchAllComments: builder.query<CommentType[], null>({
      query: () => `/api/comments/`,
      providesTags: ["Comments"],
    }),
    deleteAdminComment: builder.mutation({
      query: (id) => ({
        url: `/api/comments/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Comments", 'Post'],
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
  useDeleteAdminCommentMutation,
  useDeleteAdminPostMutation,
  useDeleteUserMutation,
} = adminApi;
