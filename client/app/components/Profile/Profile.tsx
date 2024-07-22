"use client"
import React, { FC, useEffect } from 'react'
import SidebarProfile from './SidebarProfile'
import { useLogOutMutation } from '../../../redux/features/auth/authApi'
import { signOut } from 'next-auth/react'
import ProfileDetails from './ProfileDetails'
import ChangePassword from './ChangePassword'

type Props = {
    user: any
}

const Profile: FC<Props> = ({ user }) => {
    const [scroll, setScroll] = React.useState(false)
    const [avatar, setAvatar] = React.useState(null)
    const [active, setActive] = React.useState(1)
    const [logOut, { isLoading, isSuccess, error, data }] = useLogOutMutation()
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
    return (
        <div className='w-[85%] flex mx-auto'>
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
                        <ChangePassword/>
                    </div>
                )
            }
        </div>
    )
}

export default Profile