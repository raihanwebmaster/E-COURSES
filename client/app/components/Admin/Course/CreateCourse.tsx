"use client"
import React from 'react'
import CourseInformation from './CourseInformation'
import CourseOptions from './CourseOptions'
import CourseData from './CourseData'
import CourseContent from './CourseContent'
import CoursePreview from './CoursePreview'

type Props = {}

const CreateCourse = (props: Props) => {
  const [active, setActive] = React.useState(0)
  const [courseInfo, setCourseInfo] = React.useState({
    name: '',
    description: '',
    price: 0,
    estimatePrice: 0,
    tags: '',
    level: '',
    demoUrl: '',
    thumbnail: '',
  })
  const [benefits, setBenefits] = React.useState([{ title: '' }])
  const [preRequisites, setPreRequisites] = React.useState([{ title: '' }])
  const [courseContent, setCourseContent] = React.useState([
    {
      videoUrl: '',
      title: '',
      description: '',
      videoSection: 'Untitled Section',
      links: [
        {
          title: '',
          url: ''
        }
      ],
      suggestion: ''
    }
  ]
  )
  const [courseData, setCourseData] = React.useState({})
  const handleSubmit = async () => {

    // prepare courseData
    const courseData = {
      ...courseInfo,
      totalVideo: courseContent.length,
      benefits: benefits,
      preRequisites: preRequisites,
      courseContent: courseContent
    }
    setCourseData(courseData)
  }
  const handleCourseCreate = async () => {

  }
  return (
    <div className='w-full flex min-h-screen'>
      <div className='w-[80%]'>
        {
          active === 0 && (
            <CourseInformation courseInfo={courseInfo} setCourseInfo={setCourseInfo} active={active} setActive={setActive} />
          )
        }
        {
          active === 1 && (
            <CourseData benefits={benefits} setBenefits={setBenefits} preRequisites={preRequisites} setPreRequisites={setPreRequisites} active={active} setActive={setActive} />
          )
        }
        {
          active === 2 && (
            <CourseContent courseContent={courseContent} setCourseContent={setCourseContent} active={active} setActive={setActive} handleSubmit={handleSubmit} />
          )
        }
        {
          active === 3 && (
            <CoursePreview  active={active} setActive={setActive} courseData={courseData} handleCourseCreate={handleCourseCreate}  />
          )
        }
      </div>
      <div className='w-[20%] mt-[100px] h-screen fixed z-[-1] top-18 right-0 '>
        <CourseOptions active={active} setActive={setActive} />
      </div>
    </div>
  )
}

export default CreateCourse