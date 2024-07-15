"use client"
import React from 'react'
import Heading from '@/app/utils/Heading'
import AllUsers from '@/app/components/Admin/Users/AllUsers'

type Props = {}

const Page = (props: Props) => {
    return (
        <div>
            <Heading title="E-Courses - Admin" description="E-Courses is a platform for students to learn and get help from teachers" keywords="Programming,MERN,Redux,Machine Learing" />
            <AllUsers isTeam={true} />
        </div>
    )
}

export default Page