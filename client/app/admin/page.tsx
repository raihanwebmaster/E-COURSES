'use client'
import React from 'react'
import Heading from '../utils/Heading'
import AdminSidebar from '../components/Admin/Sidebar/AdminSidebar'
import AdminProtected from '../hooks/adminProtected'

type Props = {}

const Page = (props: Props) => {
  return (
    <AdminProtected>
        <Heading title="ECourses - Admin" description="ECourses is a platform for students to learn and get help from teachers" keywords="Programming,MERN,Redux,Machine Learing" />
        <div className='flex h[200vh]' >
            <div className='1500px:w-[16%] w-1/5 ' >
                <AdminSidebar />
            </div>
            <div className='w-[85%]' >

            </div>
        </div>
    </AdminProtected>
  )
}

export default Page