'use client'
import CourseContentList from '@/app/components/Course/CourseContentList'
import CourseContentMedia from '@/app/components/Course/CourseContentMedia'
import Loader from '@/app/components/Loader/Loader'
import withAuth from '@/app/hooks/withAuth'
import Heading from '@/app/utils/Heading'
import { useGetCourseContentQuery } from '@/redux/features/courses/coursesApi'
import { redirect } from 'next/navigation'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'

type Props = {
    params: any
}

const Page = ({ params }: Props) => {
    const id = params.id
    const { user } = useSelector((state: any) => state.auth);
    useEffect(() => {
        if (user) {
            const isPurchased = user.courses.find((course: any) => course.courseId === id)
            if (!isPurchased) {
                redirect('/')
            }
        }
    }, [])
    const { data, isLoading, refetch } = useGetCourseContentQuery(id, {refetchOnMountOrArgChange: true})
    const [activeVideo, setActiveVideo] = React.useState(0)
    return (
        <div>
            <Heading title={data?.data[activeVideo]?.title} description="E-Courses is a platform for students to lear and get help from teachers" keywords={data?.data[activeVideo]?.tags} />
            {
                isLoading ? (
                    <Loader />
                ) : (
                    <div className='w-full grid 800px:grid-cols-10'>
                        <div className='col-span-7'>
                            <CourseContentMedia courseContent={data?.data} refetch={refetch} activeVideo={activeVideo} setActiveVideo={setActiveVideo} id={id} />
                        </div>
                        <div className=' hidden 800px:block 800px:col-span-3 800px:mr-[70px]'>
                            <CourseContentList data={data?.data} activeVideo={activeVideo} setActiveVideo={setActiveVideo} />
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default withAuth(Page)