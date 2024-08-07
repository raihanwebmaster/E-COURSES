"use client"
import React, { FC, useEffect, useState } from 'react'
import SidebarProfile from './SidebarProfile'
import { useLogOutMutation } from '../../../redux/features/auth/authApi'
import { signOut } from 'next-auth/react'
import ProfileDetails from './ProfileDetails'
import ChangePassword from './ChangePassword'
import { useGetAllCoursesWithOutPurchaseQuery } from '@/redux/features/courses/coursesApi'
import CourseCard from '../Route/Course/CourseCard'

type Props = {
    user: any
}

const Profile: FC<Props> = ({ user }) => {
    const [scroll, setScroll] = React.useState(false)
    const [avatar, setAvatar] = React.useState(null)
    const [active, setActive] = React.useState(1)
    const [logOut, { isLoading, isSuccess, error, data }] = useLogOutMutation()
    const { data: coursesData, isLoading: couserLoading } = useGetAllCoursesWithOutPurchaseQuery(undefined, {});
    const [courses, setCourses] = useState([]);
    const logOutHandler = async () => {
        await logOut()
    }
    useEffect(() => {
        const handleSignOut = async () => {
            if (isSuccess) {
                await signOut();
            }
        };
        handleSignOut();
    }, [isSuccess, error, data])
    useEffect(() => {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 85) {
                setScroll(true)
            } else {
                setScroll(false)
            }
        })
    }, [])
    console.log(user, 'user')

    useEffect(() => {
        if (coursesData) {
            const filteredCourses = user.courses
                .map((userCourse: any) =>
                    coursesData.data.find((course: any) => course._id === userCourse.courseId)
                )
                .filter((course: any) => course !== undefined);
            setCourses(filteredCourses);
        }
    }, [coursesData]);
    return (
        <div className='w-[85%] flex mx-auto '>
            <div className={`w-[60px] 800px:w-[310px] h-[450px] dark:bg-slate-900 bg-white bg-opacity-90  dark:border-[#ffffff1d] border-[#00000014] rounded-[5px] shadow-xl dark:shadow-sm mt-[80px] mb-[80px] sticky ${scroll ? "top-[120px]" : "top-[30px]"} left-[30px] `}>
                <SidebarProfile user={user} active={active} avatar={avatar} setActive={setActive} logOutHandler={logOutHandler} />
            </div>
            {
                active === 1 && (
                    <div className='w-full h-full bg-transparent mt-[80px]'>
                        <ProfileDetails user={user} avatar={avatar} />
                    </div>
                )
            }
            {
                active === 2 && (
                    <div className='w-full h-full bg-transparent mt-[80px]'>
                        <ChangePassword />
                    </div>
                )
            }
            {active === 3 && (
                <div className="w-full pl-7 px-2 800px:px-10 800px:pl-8 mt-[80px]">
                    <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 lg:gap-[25px] 1500px:grid-cols-4 1500px:gap-[35px] mb-12 border-0">
                        {courses &&
                            courses.map((item: any, index: number) => (
                                <CourseCard item={item} key={index} isProfile={true} />
                            ))}
                    </div>
                    {courses.length === 0 && (
                        <h1 className="text-center text-[18px] font-Poppins dark:text-white text-black">
                            You don&apos;t have any purchased courses!
                        </h1>
                    )}
                </div>
            )}
        </div>
    )
}

export default Profile