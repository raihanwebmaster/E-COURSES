'use client'
import React, { FC } from 'react'
import Heading from '../../../utils/Heading'
import CoursesAnalytics from '../../../components/Admin/Analytics/CoursesAnalytics'

type Props = {}

const Page:FC<Props> = () => {
  return (
    <div>
        <Heading title="E-Courses - Admin" description="E-Courses is a platform for students to learn and get help from teachers" keywords="Programming,MERN,Redux,Machine Learing" />  
        <CoursesAnalytics/>
    </div>
  )
}

export default Page