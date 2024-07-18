'use client'
import DashboardWidget from '@/app/components/Admin/DashboardWidget'
import Heading from '@/app/utils/Heading'
import React from 'react'

type Props = {}

const Page = (props: Props) => {
  const [open, setOpen] = React.useState(false)
  return (
    <div>
      <Heading title="E-Courses - Admin" description="E-Courses is a platform for students to learn and get help from teachers" keywords="Programming,MERN,Redux,Machine Learing" />
      <DashboardWidget open={open} />
    </div>
  )
}

export default Page