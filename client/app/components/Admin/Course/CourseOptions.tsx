import React, { FC } from 'react'

type Props = {
    active: number
    setActive: (active: number) => void
}

const CourseOptions:FC<Props> = (props) => {
    const options = [
        "Course Information",
        "Course Options",
        "Course Content",
        "Course Preivew",
    ]
  return (
    
    <div>
        hola
    </div>
  )
}

export default CourseOptions