"use client"

import CreateCourse from '@/app/components/Admin/Course/CreateCourse'
import DashboardHeader from '@/app/components/Admin/DashboardHeader'
import Heading from '@/app/utils/Heading'
import React, { useState } from 'react'
type Props = {}

const Page = (props: Props) => {
  const [open, setOpen] = useState(false)
  return (
    <div>
      <Heading title="E-Courses - Admin" description="E-Courses is a platform for students to learn and get help from teachers" keywords="Programming,MERN,Redux,Machine Learing" />
      <DashboardHeader open={open} setOpen={setOpen} />
      <CreateCourse />
    </div>
  )
}

export default Page