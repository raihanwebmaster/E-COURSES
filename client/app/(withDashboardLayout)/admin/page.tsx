'use client'
import DashboardWidget from '../../components/Admin/DashboardWidget'
import Heading from '../../utils/Heading'
import React from 'react'

type Props = {}

const Page = (props: Props) => {
  return (
    <div>
      <Heading title="E-Courses - Admin" description="E-Courses is a platform for students to learn and get help from teachers" keywords="Programming,MERN,Redux,Machine Learing" />
      <DashboardWidget />
    </div>
  )
}

export default Page