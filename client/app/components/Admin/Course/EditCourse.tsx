"use client"
import React, { FC, useEffect } from 'react'
import CourseInformation from './CourseInformation'
import CourseOptions from './CourseOptions'
import CourseData from './CourseData'
import CourseContent from './CourseContent'
import CoursePreview from './CoursePreview'
import { useCreateCourseMutation, useGetAllCoursesQuery, useUpdateCourseMutation } from '@/redux/features/courses/coursesApi'
import toast from 'react-hot-toast'
import { redirect } from 'next/navigation'

interface CourseType {
    _id: string;
}

type Props = {
    id: string
}

const EditCourse: FC<Props> = ({ id }) => {
    const [updateCourse, {isSuccess, isLoading, error: updateError}] = useUpdateCourseMutation()
    const { data, refetch, error } = useGetAllCoursesQuery({}, { refetchOnMountOrArgChange: true })
    const editCourseData = data?.data && data.data.find((course: CourseType) => course._id === id)
    const [active, setActive] = React.useState(0)
    const [courseInfo, setCourseInfo] = React.useState({
        name: '',
        description: '',
        price: 0,
        estimatePrice: 0,
        categories: [],
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
    const [createCourseData, setCreateCourseData] = React.useState({})
    useEffect(() => {
        if (editCourseData) {
            setCourseInfo({
                name: editCourseData.name,
                description: editCourseData.description,
                price: editCourseData.price,
                estimatePrice: editCourseData.estimatePrice,
                categories: editCourseData.categories,
                tags: editCourseData.tags,
                level: editCourseData.level,
                demoUrl: editCourseData.demoUrl,
                thumbnail: editCourseData?.thumbnail?.url,
            });
            setBenefits(editCourseData.benefits);
            setPreRequisites(editCourseData.prerequisites);
            setCourseContent(editCourseData.courseData);
        }
    }, [editCourseData]);

    const handleSubmit = async () => {

        // prepare createCourseData
        const createCourse = {
            ...courseInfo,
            totalVideo: courseContent.length,
            benefits: benefits,
            prerequisites: preRequisites,
            courseData: courseContent
        }
        setCreateCourseData(createCourse)
    }

    const handleCourseUpdate = async () => {
        await updateCourse({ id, course: createCourseData })
    }

    useEffect(() => {
        if (isSuccess) {
            toast.success('Course Updated Successfully')
            redirect('/admin/courses')
        }
        if(updateError) {
            if ('data' in updateError) {
                const errorData = updateError as any;
                toast.error(errorData.data.message)
            }
        }
    }, [isSuccess, updateError])
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
                        <CoursePreview active={active} setActive={setActive} courseData={createCourseData} handleCourseCreate={handleCourseUpdate} isLoading={isLoading} isEdit={true} />
                    )
                }
            </div>
            <div className='w-[20%] mt-[100px] h-screen fixed z-[-1] top-18 right-0 '>
                <CourseOptions active={active} setActive={setActive} />
            </div>
        </div>
    )
}

export default EditCourse