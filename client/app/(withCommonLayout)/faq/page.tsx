"use client"
import Faq from '@/app/components/Route/FAQ/Faq'
import Heading from '@/app/utils/Heading'
import React from 'react'

type Props = {}

const page = (props: Props) => {
    return (
        <div>
            <Heading title="FAQ - Elearning" description="Elearning is a learning management system for helping programmers." keywords="programming,mern" />
            <div className='mt-[70px]'>
                <Faq />
            </div>
        </div>
    )
}

export default page