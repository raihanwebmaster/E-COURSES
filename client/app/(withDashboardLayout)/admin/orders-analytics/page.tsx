'use client'
import React, { FC } from 'react'
import Heading from '../../../utils/Heading'
import OrdersAnalytics from '../../../components/Admin/Analytics/OrdersAnalytics'

type Props = {}

const Page:FC<Props> = () => {
  return (
    <div>
        <Heading title="E-Courses - Admin" description="E-Courses is a platform for students to learn and get help from teachers" keywords="Programming,MERN,Redux,Machine Learing" />  
        <OrdersAnalytics    />
    </div>
  )
}

export default Page