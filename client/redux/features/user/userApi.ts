import { apiSlice } from "../api/appSlice";

export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    updateAvatar: builder.mutation({
      query: (data) => ({
        url: `/user/update-avatar`,
        method: "PUT",
        body: data,
        credentials: "include" as const,
      }),
    }),
    editProfile: builder.mutation({
      query: (data) => ({
        url: `/user/update-info`,
        method: "PUT",
        body: data,
        credentials: "include" as const,
      }),
    }),
    getAllUsers: builder.query({
      query: () => ({
        url: `/user/all-users`,
        method: "GET",
        credentials: "include" as const,
      }),
    })
  }),
});

export const { useUpdateAvatarMutation, useEditProfileMutation, useGetAllUsersQuery } = userApi;