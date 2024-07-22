'use client'
import { useGetCourseWithOutPurchaseQuery } from '@/redux/features/courses/coursesApi'
import CourseDetailsPage from '../../../components/Course/CourseDetailsPage'
import React from 'react'
import Heading from '@/app/utils/Heading'

type Props = {}

const Page = ({params}: any) => {
  const {data, isLoading} = useGetCourseWithOutPurchaseQuery(params.id)
  return (
    <div>
      <Heading title={`${data?.data?.name} - E-Courses`} description="E-Courses is a platform for students to lear and get help from teachers" keywords={data?.data?.tags} />
      <CourseDetailsPage id={params.id} course={data?.data} isLoading={isLoading} />
    </div>
  )
}

export default Page