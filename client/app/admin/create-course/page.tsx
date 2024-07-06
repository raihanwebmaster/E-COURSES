"use client"
import AdminProtected from '@/app/hooks/adminProtected'
import Heading from '@/app/utils/Heading'
import React, { useState } from 'react'
import AdminSidebar from '../../../app/components/Admin/Sidebar/AdminSidebar'
import DashboardHeader from '@/app/components/Admin/DashboardHeader'
import CreateCourse from '@/app/components/Admin/Course/CreateCourse'

type Props = {}

const Page = (props: Props) => {
  const [ open, setOpen ] = useState(false)
  return (
    <div>
      <AdminProtected>
        <Heading title="ECourses - Admin" description="ECourses is a platform for students to learn and get help from teachers" keywords="Programming,MERN,Redux,Machine Learing" />
        <div className='flex h-[200vh]' >
          <div className='1500px:w-[16%] w-1/5 ' >
            <AdminSidebar />
          </div>
          <div className='w-[85%]' >
            <DashboardHeader open={open} setOpen={setOpen} />
            <CreateCourse/>
          </div>
        </div>
      </AdminProtected>
    </div>
  )
}

export default Page