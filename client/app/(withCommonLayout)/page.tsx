"use client"
import React , {FC} from "react"
import Heading from "../utils/Heading";
import Hero from "../components/Route/Hero";

interface Props{}

const HomePage: FC<Props> = (props)  => {
  return (
    <div>
      <Heading title="E-Courses" description="E-Courses is a platform for students to lear and get help from teachers" keywords="Programming,MERN,Redux,Machine Learning" />
      <Hero />
    </div>
  )
}

export default HomePage;