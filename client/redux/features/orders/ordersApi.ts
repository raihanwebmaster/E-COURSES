import { apiSlice } from "../api/appSlice";


export const ordersApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllOrders: builder.query({
      query: (type) => ({
        url: `/order/all-orders`,
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    createOrder: builder.mutation({
      query: ({ courseId, payment_info }) => ({
        url: "create-order",
        body: {
          courseId,
          payment_info,
        },
        method: "POST",
        credentials: "include" as const,
      }),
    }),
  }),
});

export const  {useGetAllOrdersQuery, useCreateOrderMutation} = ordersApi;


