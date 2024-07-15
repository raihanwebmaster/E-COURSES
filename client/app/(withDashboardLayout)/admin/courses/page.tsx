'use client'
import AllCourses from '@/app/components/Admin/Course/AllCourses'
import Heading from '@/app/utils/Heading'
import React, { FC } from 'react'

type Props = {}

const Page:FC<Props> = () => {
  return (
    <div>
        <Heading title="E-Courses - Admin" description="E-Courses is a platform for students to learn and get help from teachers" keywords="Programming,MERN,Redux,Machine Learing" />  
        <AllCourses/>  
    </div>
  )
}

export default Page