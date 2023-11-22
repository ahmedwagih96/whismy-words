import { PostType } from "@/typings/mongoTypes";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const postApi = createApi({
  reducerPath: "postApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_URL,
  }),
  tagTypes: ['Post'],
  endpoints: (builder) => ({
    getPostById: builder.query<PostType, { id: string }>({
      query: ({ id }) => `/api/posts/${id}`,
      providesTags: ['Post']
    }),
    updatePost: builder.mutation({
      query: ({ formData, id, token }) => ({
        url: `/api/posts/${id}`,
        method: "PUT",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ['Post'],
    }),
    deletePost: builder.mutation({
      query: ({ id, token }) => ({
        url: `/api/posts/${id}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
  }),
});

export const {
  useGetPostByIdQuery,
  useUpdatePostMutation,
  useDeletePostMutation,
} = postApi;
