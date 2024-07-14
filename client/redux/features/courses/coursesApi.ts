import { apiSlice } from "../api/appSlice";

export const coursesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createCourse: builder.mutation({
        query: (course) => ({
            url: "/course/create-course",
            method: "POST",
            body: course,
            credentials: "include" as const,
        }),
    }),
  }),
});

export const { useCreateCourseMutation } = coursesApi;