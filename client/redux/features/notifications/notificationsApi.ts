import { apiSlice } from "../api/appSlice";

export const notificationsApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getNotifications: builder.query({
            query: ()=> ({
                url: '/notification/all-notificaitons',
                method: 'GET',
                credentials: 'include' as const,
            })
        }),
        updateNotifcation: builder.mutation({
            query: (id: string) => ({
                url: `/notification/${id}`,
                method: 'PUT',
                credentials: 'include' as const,
            })
        }),

    }),
});

export const { useGetNotificationsQuery, useUpdateNotifcationMutation } = notificationsApi;