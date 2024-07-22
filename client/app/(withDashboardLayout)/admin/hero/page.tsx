"use client";
import EditHero from '../../../components/Admin/Customization/EditHero';
import Heading from '../../../utils/Heading';
import React from 'react'

type Props = {}

const Page = (props: Props) => {
  return (
    <div>
        <Heading title="E-Courses - Admin" description="E-Courses is a platform for students to learn and get help from teachers" keywords="Programming,MERN,Redux,Machine Learing" />
        <EditHero />
    </div>
  )
}

export default Page