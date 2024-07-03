import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { userLoggedIn } from "../auth/authSlice";

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
        loadUser: builder.query({   
            query: () => ({
                url: '/user/me',
                method: 'GET',
                credentials: 'include',
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) { 
                try {
                    const result = await queryFulfilled;
                    dispatch(userLoggedIn({
                        user: result.data.data.user,
                        token: result.data.data.accessToken,
                    }));
                } catch (error) {
                    console.error(error);
                }
             }
        }),
    }),
});

export const { useRefreshTokenQuery, useLoadUserQuery  } = apiSlice;