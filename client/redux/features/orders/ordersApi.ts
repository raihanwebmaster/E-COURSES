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
      query: ({ courseId, paymentInfo }) => ({
        url: "/order/create-order",
        body: {
          courseId,
          paymentInfo,
        },
        method: "POST",
        credentials: "include" as const,
      }),
    }),
    getStripePublishableKey: builder.query({
      query: () => ({
        url: "/order/stripe-publishable-key",
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    createPayment: builder.mutation({
      query: (payment_info) => ({
        url: "/order/payment",
        body: payment_info,
        method: "POST",
        credentials: "include" as const,
      }),
    }),
  }),
});

export const { useGetAllOrdersQuery, useCreateOrderMutation, useGetStripePublishableKeyQuery, useCreatePaymentMutation } = ordersApi;


