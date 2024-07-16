import { apiSlice } from "../api/appSlice";

export const layoutsApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getLayout: builder.query({
            query: (type) => ({
                url: `/layout/get-layout/${type}`,
                method: "GET",
                credentials: "include",
            })
        }),
        editLayouts: builder.mutation({
            query: (data) => ({
                url: `/layout/update`,
                method: "PUT",
                credentials: "include",
                body: data,
            }),
        }),
    }),
});

export const { useGetLayoutQuery, useEditLayoutsMutation } = layoutsApi;