"use client"

import React , {FC} from "react"
import Heading from "./utils/Heading";

interface Props{}

const Page: FC<Props> = (props)  => {
  return (
    <div>
      <Heading title="ECourses" description="ECourses is a platform for students to lear and get help from teachers" keywords="Programming,MERN,Redux,Machine Learning" />
    </div>
  )
}

export default Page;