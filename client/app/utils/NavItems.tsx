import Link from 'next/link'
import React, { FC } from 'react'

export const navItemsData = [
    {
        name: 'Home',
        url: '/'
    },
    {
        name: 'Courses',
        url: '/courses'
    },
    {
        name: 'About',
        url: '/about'
    },
    {
        name: 'Policy',
        url: '/plicty'
    },
    {
        name: 'FAQ',
        url: '/faq'
    }
]

type Props = {
    activeItem: number,
    isMobile: boolean
}

const NavItems: FC<Props> = ({ activeItem, isMobile }) => {
    return (
        <>
            <div className='hidden 800px:flex'>
                {navItemsData && navItemsData.map((item, index) => (
                    <Link href={`${item.url}`} key={index}>
                        <span className={`${activeItem === index ? "dark:text-[#37a39a] text-[crimson] " : " dark:text-white text-black "} text-[18px] px-6 font-Poppins font-[400]`}>
                            {item.name}
                        </span>
                    </Link>
                ))}
            </div>
            {isMobile && (
                <div className='800px:hidden mt-5'>
                    <div className='w-full text-center py-6'>
                        <Link href='/' passHref>
                            <span className={`text-[25px] font-Poppins font-[500] text-black dark:text-white`}>
                                ECourses
                            </span> 
                        </Link>
                    </div>
                    {
                        navItemsData && navItemsData.map((item, index) => (
                            <Link href='/' passHref key={index}>
                                <span className={`${activeItem === index ? "dark:text-[#37a39a] text-[crimson]" : " dark:text-white text-black"} block py-5 text-[18px] px-6 font-Poppins font-[400]`}>
                                    {item.name}
                                </span>
                            </Link>
                        ))
                    }

                </div>
            )}
        </>
    )
}

export default NavItems