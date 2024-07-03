import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_SERVER_URL }),
    endpoints: (builder) => ({
        refreshToken : builder.query({
            query: () => ({
                url: '/auth/refresh-token',
                method: 'GET',
                credentials: 'include',
            }),

        }),
    }),
});

export const { useRefreshTokenQuery } = apiSlice;