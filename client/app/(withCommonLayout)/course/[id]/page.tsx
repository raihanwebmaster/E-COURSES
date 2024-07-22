'use client'
import CourseDetailsPage from '@/app/components/Course/CourseDetailsPage'
import React from 'react'

type Props = {}

const Page = ({params}: any) => {

  return (
    <div>
      <CourseDetailsPage id={params.id} />
    </div>
  )
}

export default Page