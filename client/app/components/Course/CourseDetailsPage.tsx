'use client'
import { useGetCourseWithOutPurchaseQuery } from '../../../redux/features/courses/coursesApi';
import React, { FC } from 'react'

type Props = {
    id:string
}

const CourseDetailsPage:FC<Props> = ({id}) => {
   const {data} = useGetCourseWithOutPurchaseQuery(id)
  return (
    <div>CourseDetailsPage</div>
  )
}

export default CourseDetailsPage