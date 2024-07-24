'use client'
import { useGetCourseWithOutPurchaseQuery } from '@/redux/features/courses/coursesApi'
import CourseDetails from '../../../components/Course/CourseDetails'
import React from 'react'
import Heading from '@/app/utils/Heading'

type Props = {}

const Page = ({params}: any) => {
  const {data, isLoading} = useGetCourseWithOutPurchaseQuery(params.id)
  return (
    <div>
      <Heading title={`${data?.data?.name} - E-Courses`} description="E-Courses is a platform for students to lear and get help from teachers" keywords={data?.data?.tags} />
      <CourseDetails id={params.id} course={data?.data} isLoading={isLoading} />
    </div>
  )
}

export default Page