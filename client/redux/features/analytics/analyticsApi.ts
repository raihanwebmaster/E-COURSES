import { apiSlice } from "../api/appSlice";

export const analyticsApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getCoursesAnalytics: builder.query({
            query: () => ({
                url: "/analytics/courses",
                method: "GET",
                credentials: "include",
            }),
        }),
        getUsersAnalytics: builder.query({
            query: () => ({
                url: "/analytics/users",
                method: "GET",
                credentials: "include",
            }),
        }),
        getOrdersAnalytics: builder.query({
            query: () => ({
                url: "/analytics/orders",
                method: "GET",
                credentials: "include",
            }),
        }),
    }),
});

export const { useGetCoursesAnalyticsQuery, useGetUsersAnalyticsQuery, useGetOrdersAnalyticsQuery } = analyticsApi;