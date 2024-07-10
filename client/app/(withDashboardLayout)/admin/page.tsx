'use client'
import DashboardHero from '@/app/components/Admin/DashboardHero'
import Heading from '@/app/utils/Heading'
import React from 'react'

type Props = {}

const Page = (props: Props) => {
  return (
    <div>
      <Heading title="ECourses - Admin" description="ECourses is a platform for students to learn and get help from teachers" keywords="Programming,MERN,Redux,Machine Learing" />
      <DashboardHero />
    </div>
  )
}

export default Page