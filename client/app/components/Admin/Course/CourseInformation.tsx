import { useFormik } from 'formik';
import React, { FC } from 'react'
import * as Yup from 'yup'

type Props = {
  courseInfo: any;
  setCourseInfo: (courseInfo: any) => void;
  active: number;
  setActive: (active: number) => void;
}

const schema = Yup.object().shape({
  name: Yup.string().required("Please enter the course name!"),
  description: Yup.string().required("Please enter the course description!"),
  price: Yup.number().required("Please enter the course price!"),
  estimatePrice: Yup.number().optional(),
  tags: Yup.string().required("Please enter the course tags!"),
  level: Yup.string().required("Please enter the course level!"),
  demoUrl: Yup.string().url().required("Please enter the course demo URL!"),
})

const CourseInformation:FC<Props> = ({courseInfo, setCourseInfo, active, setActive}) => {
  const [dragging, setDragging] = React.useState(false)
  // const handleSubmit = (e: any) => {
  //   e.preventDefault()
  //   setActive(active + 1)
  // }
  const formik = useFormik({
    initialValues: {
        email: "",
        password: ""
    },
    validationSchema: schema,
    onSubmit: async (values) => {
    }
})
  return (
    <div className='w-[80%] m-auto mt-24 '>
      <form action="">
        <label htmlFor="">Course Name</label>
      </form>
    </div>
  )
}

export default CourseInformation