"use client";
import React from 'react'
import EditFAQ from '../../../components/Admin/Customization/EditFAQ';
import Heading from '../../../utils/Heading';

type Props = {}

const Page = (props: Props) => {
  return (
    <div>
        <Heading title="E-Courses - Admin" description="E-Courses is a platform for students to learn and get help from teachers" keywords="Programming,MERN,Redux,Machine Learing" />
        <EditFAQ />
    </div>
  )
}

export default Page