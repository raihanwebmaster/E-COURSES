'use client'
import React from 'react'
import AllUsers from '@/app/components/Admin/Users/AllUsers'
import Heading from '@/app/utils/Heading'

type Props = {}

const Page = (props: Props) => {
    return (
        <div>
            <Heading title="E-Courses - Admin" description="E-Courses is a platform for students to learn and get help from teachers" keywords="Programming,MERN,Redux,Machine Learing" />
            <AllUsers />
        </div>
    )
}

export default Page