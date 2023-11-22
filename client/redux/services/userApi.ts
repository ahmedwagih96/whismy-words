import { UserType } from "@/typings/mongoTypes";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "userApi",
  refetchOnFocus: true,
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_URL,
  }),
  tagTypes: ['User'],
  endpoints: (builder) => ({
    getUserById: builder.query<UserType, { id: string }>({
      query: ({ id }) => `/api/users/${id}`,
      providesTags: ['User']
    }),
    updateUser: builder.mutation({
      query: ({ formData, id, token }) => ({
        url: `/api/users/${id}`,
        method: "PUT",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ['User'],
    }),
    deleteUser: builder.mutation({
      query: ({ id, token }) => ({
        url: `/api/users/${id}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
  }),
});

export const {
  useGetUserByIdQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = userApi;
