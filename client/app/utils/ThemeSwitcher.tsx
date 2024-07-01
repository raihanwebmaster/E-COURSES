'use client'
import React, {FC, useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import { BiMoon, BiSun } from 'react-icons/bi'

type Props = {}

const ThemeSwitcher:FC<Props> = (props) => {
    const [mounted, setMounted] = useState(false)
    const {theme, setTheme} = useTheme()
    useEffect(() => setMounted(true), [])
    if (!mounted) return null
  return (
    <div className='flex items-center justify-center mx-4'>
        {
            theme === 'dark' ? (
                <BiSun onClick={() => setTheme('light')} className='cursor-pointer' size={25}  />
            ) : (
                <BiMoon onClick={() => setTheme('dark')} className=' cursor-pointer' fill='black' size={25} />
            )
        }
        
    </div>
  )
}

export default ThemeSwitcher