"use client"
import CreateCourse from '@/app/components/Admin/Course/CreateCourse'
import Heading from '@/app/utils/Heading'
import React from 'react'
type Props = {}

const Page = (props: Props) => {
  return (
    <div>
      <Heading title="E-Courses - Admin" description="E-Courses is a platform for students to learn and get help from teachers" keywords="Programming,MERN,Redux,Machine Learing" />
      <CreateCourse />
    </div>
  )
}

export default Page