import { UserType } from "@/typings/mongoTypes";
import { baseApi } from "./baseApi";

export const userApi = baseApi.injectEndpoints({
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
      invalidatesTags: ["User", 'Users'],
    }),
  }),
})


export const { useGetUserByIdQuery, useUpdateUserMutation } = userApi;
