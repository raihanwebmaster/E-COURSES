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
    }),
    updateUserRole: builder.mutation({
      query: ({ email, role }) => ({
        url: `/user/update-role`,
        method: "PUT",
        body: { email, role },
        credentials: "include" as const,
      }),
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/user/delete/${id}`,
        method: "DELETE",
        credentials: "include" as const,
      }),
    }),
  }),
});

export const { useUpdateAvatarMutation, useEditProfileMutation, useGetAllUsersQuery, useUpdateUserRoleMutation, useDeleteUserMutation } = userApi;