"use client"
import React from 'react'
import CourseInformation from './CourseInformation'
import CourseOptions from './CourseOptions'

type Props = {}

const CreateCourse = (props: Props) => {
  const [active, setActive] = React.useState(0)
  const [courseInfo, setCourseInfo] = React.useState({
    name: '',
    description: '',
    price: 0,
    estimatedPrice: 0,
    tags: '',
    level: '',
    dmeoUrl: '',
    thumbnail: '',
  })
  const [benefits, setBenefits] = React.useState([{title: ''}])
  const [preRequisites, setPreRequisites] = React.useState([{title: ''}])
  const  [courseContentData, setCourseContentData] = React.useState([{
    videoUrl: '',
    title: '',
    descrition: '',
    videoSection: 'Untitled Section',
    links: [
      {
        title: '',
        url: ''
      }
    ],
    suggestion: ''
  }])
  const [courseData, setCourseData] = React.useState({})
  return (
    <div className='w-full flex min-h-screen'>
      <div className='w-[80%]'>
          {
            active === 0 && (
                <CourseInformation courseInfo={courseInfo} setCourseInfo={setCourseInfo} active={active} setActive={setActive}  />
            )
          }
      </div>
      <div className='w-[20%] mt-[100px] h-screen fixed z-[-1] top-18 right-0 '>
          <CourseOptions active={active} setActive={setActive}/>
      </div>
    </div>
  )
}

export default CreateCourse