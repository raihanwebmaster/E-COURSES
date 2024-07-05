"use client"
import React, { FC, useState } from 'react'
import Protected from '../hooks/useProtected'
import Heading from '../utils/Heading'
import Header from '../components/Header'
import Profile from '../components/Profile/Profile'
import { useSelector } from 'react-redux'

type Props = {}

const Page: FC<Props> = (props) => {
  const {user} = useSelector((state: any) => state.auth);
  const [open, setOpen] = useState(false)
  const [activeItem, setActiveItem] = useState(5)
  const [route, setRoute] = useState("Login")
  return (
    <div>
      <Protected>
        <Heading title={`${user?.name} Profile - ECourses`} description="ECourses is a platform for students to lear and get help from teachers" keywords="Programming,MERN,Redux,Machine Learning" />
        <Header open={open} setOpen={setOpen} activeItem={activeItem} route={route} setRoute={setRoute} />
        <Profile user={user} />
      </Protected>
    </div>
  )
}

export default Page