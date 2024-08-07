import Image from 'next/image'
import React, { FC } from 'react'
import avatarDefault from '../../../public/assests/avatar.png'
import { RiLockPasswordLine } from 'react-icons/ri'
import { SiCoursera } from 'react-icons/si'
import { AiOutlineLogout } from 'react-icons/ai'
import { MdOutlineAdminPanelSettings } from 'react-icons/md'
import Link from 'next/link'

type Props = {
  user: any,
  active: number,
  avatar: string | null,
  setActive: (active: number) => void,
  logOutHandler: any
}

const SidebarProfile: FC<Props> = ({ user, active, avatar, setActive, logOutHandler }) => {
  return (
    <div className='w-full'>
      <div className={`w-full flex items-center px-3 py-4 cursor-pointer ${active === 1 ? "dark:bg-slate-800 bg-slate-100" : "bg-transparent"} hover:dark:bg-slate-800 hover:bg-slate-100`} onClick={() => setActive(1)}>
        <Image
          src={user.avatar ? user.avatar.url : avatarDefault}
          width={20}
          height={20}
          alt="avatar"
          className='w-[20px] h-[20px] 800px:w-[30px] 800px:h-[30px] cursor-pointer rounded-full'
        />
        <h5 className='pl-2 800px:block hidden font-Poppins dark:text-white text-black'>
          My Profile
        </h5>
      </div>
      <div
        className={`w-full flex items-center px-3 py-4 cursor-pointer ${active === 2 ? "dark:bg-slate-800 bg-slate-100" : "bg-transparent"} hover:dark:bg-slate-800 hover:bg-slate-100`}
        onClick={() => setActive(2)}
      >
        <RiLockPasswordLine size={20} className='dark:text-white text-black' />
        <h5 className="pl-2 800px:block hidden font-Poppins dark:text-white text-black">Change Password</h5>
      </div>
      <div
        className={`w-full flex items-center px-3 py-4 cursor-pointer ${active === 3 ? "dark:bg-slate-800 bg-slate-100" : "bg-transparent"} hover:dark:bg-slate-800 hover:bg-slate-100`}
        onClick={() => setActive(3)}
      >
        <SiCoursera size={20} className='dark:text-white text-black' />
        <h5 className="pl-2 800px:block hidden font-Poppins dark:text-white text-black">Enrolled Courses</h5>
      </div>
      {
        user && user.role === 'admin' && (
          <Link href="/admin" className={`w-full flex items-center px-3 py-4 cursor-pointer ${active === 6 ? "dark:bg-slate-800 bg-slate-100" : "bg-transparent"} hover:dark:bg-slate-800 hover:bg-slate-100`}>
            <MdOutlineAdminPanelSettings size={20} className='dark:text-white text-black' />
            <h5 className="pl-2 800px:block hidden font-Poppins dark:text-white text-black">Admin Dashboard</h5>
          </Link>
        )
      }

      <div
        className={`w-full flex items-center px-3 py-4 cursor-pointer ${active === 4 ? "dark:bg-slate-800 bg-slate-100" : "bg-transparent"} hover:dark:bg-slate-800 hover:bg-slate-100`}
        onClick={() => logOutHandler()}
      >
        <AiOutlineLogout size={20} className='dark:text-white text-black' />
        <h5 className="pl-2 800px:block hidden font-Poppins dark:text-white text-black">Log Out</h5>
      </div>

    </div>
  )
}

export default SidebarProfile