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
    getAllCourses: builder.query({
      query: () => ({
        url: "/course/get-all-courses",
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    deleteCourse: builder.mutation({
      query: (courseId) => ({
        url: `/course/delete-course/${courseId}`,
        method: "DELETE",
        credentials: "include" as const,
      }),
    }),
    updateCourse: builder.mutation({
      query: ({id, course}) => ({
        url: `/course/update-course/${id}`,
        method: "PUT",
        body: course,
        credentials: "include" as const,
      }),
    }),
    getAllCoursesWithOutPurchase: builder.query({
      query: () => ({
        url: "/course/get-all-courses-without-purchaseing",
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    getCourseWithOutPurchase: builder.query({
      query: (courseId) => ({
        url: `/course/get-course-without-purchaseing/${courseId}`,
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    getCourseContent : builder.query({
      query: (courseId) => ({
        url: `/course/get-course-by-user/${courseId}`,
        method: "GET",
        credentials: "include" as const,
      }),
    })
  }),
});

export const { useCreateCourseMutation, useGetAllCoursesQuery, useDeleteCourseMutation, useUpdateCourseMutation, useGetAllCoursesWithOutPurchaseQuery, useGetCourseWithOutPurchaseQuery, useGetCourseContentQuery } = coursesApi;