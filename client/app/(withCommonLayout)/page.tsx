"use client"
import React , {FC} from "react"
import Heading from "../utils/Heading";
import Hero from "../components/Route/Hero";
import Courses from "../components/Route/Courses";
import Reviews from "../components/Route/Reviews";
import Faq from "../components/Route/FAQ/Faq";
import Footer from "../components/Footer/Footer";

interface Props{}

const HomePage: FC<Props> = (props)  => {
  return (
    <div>
      <Heading title="E-Courses" description="E-Courses is a platform for students to lear and get help from teachers" keywords="Programming,MERN,Redux,Machine Learning" />
      <Hero />
      <Courses />
      <Reviews />
      <Faq />
      <Footer/>
    </div>
  )
}

export default HomePage;