'use client'
import React, { FC } from 'react'
import Heading from '../../../utils/Heading'
import UsersAnalytics from '../../../components/Admin/Analytics/UsersAnalytics'

type Props = {}

const Page:FC<Props> = () => {
  return (
    <div>
        <Heading title="E-Courses - Admin" description="E-Courses is a platform for students to learn and get help from teachers" keywords="Programming,MERN,Redux,Machine Learing" />  
        <UsersAnalytics/>
    </div>
  )
}

export default Page