import { UserType } from "@/typings/mongoTypes";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getSession } from "next-auth/react";
export const userApi = createApi({
  reducerPath: "userApi",
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
  tagTypes: ["User"],
  endpoints: (builder) => ({
    getUserById: builder.query<UserType, { id: string }>({
      query: ({ id }) => `/api/users/${id}`,
      providesTags: ["User"],
    }),
    updateUser: builder.mutation({
      query: ({ formData, id }) => ({
        url: `/api/users/${id}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["User"],
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/api/users/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetUserByIdQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = userApi;
