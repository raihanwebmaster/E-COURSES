"use client";
import Faq from '@/app/components/Admin/Customization/Faq';
import Heading from '@/app/utils/Heading';
import React from 'react'

type Props = {}

const Page = (props: Props) => {
  return (
    <div>
        <Heading title="E-Courses - Admin" description="E-Courses is a platform for students to learn and get help from teachers" keywords="Programming,MERN,Redux,Machine Learing" />
        <Faq />
    </div>
  )
}

export default Page