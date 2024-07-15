"use client"
import React, { FC, useState } from 'react'
import Heading from '../../utils/Heading'
import Profile from '../../components/Profile/Profile'
import { useSelector } from 'react-redux'
import withAuth from '@/app/hooks/withAuth'

type Props = {}

const Page: FC<Props> = (props) => {
  const {user} = useSelector((state: any) => state.auth);
  return (
    <div>
        <Heading title={`${user?.name} Profile - E-Courses`} description="E-Courses is a platform for students to lear and get help from teachers" keywords="Programming,MERN,Redux,Machine Learning" />
        <Profile user={user} />
    </div>
  )
}

export default withAuth(Page)