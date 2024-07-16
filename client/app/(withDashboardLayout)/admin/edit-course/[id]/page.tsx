"use client"
import EditCourse from '@/app/components/Admin/Course/EditCourse'
import Heading from '@/app/utils/Heading'
import React from 'react'

type Props = {}

const Page = ({params}: any) => {
    const id = params.id
  return (
    <div>
        <Heading title="E-Courses - Admin" description="E-Courses is a platform for students to learn and get help from teachers" keywords="Programming,MERN,Redux,Machine Learing" />
        <EditCourse id={id} />
    </div>
  )
}

export default Page