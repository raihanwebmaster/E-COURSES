import { styles } from '@/app/styles/styles';
import { useFormik } from 'formik';
import Image from 'next/image';
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
  thumbnail: Yup.mixed().required("Please upload the course thumbnail!"),
})

const CourseInformation: FC<Props> = ({ courseInfo, setCourseInfo, active, setActive }) => {
  const [dragging, setDragging] = React.useState(false)

  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
      price: 0,
      estimatePrice: 0,
      tags: '',
      level: '',
      demoUrl: '',
      thumbnail: ''
    },
    validationSchema: schema,
    onSubmit: async (values) => {
      // setCourseInfo(values)
      setActive(active + 1);
    }
  })

  const handleFileChange = (e: any) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = () => {
        if (reader.readyState === 2) {
          formik.setFieldValue('thumbnail', reader.result)
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const handleDragOver = (e: any) => {
    e.preventDefault()
    setDragging(true)
  }

  const handleDragLeave = (e: any) => {
    e.preventDefault()
    setDragging(false)
  }

  const handleDrop = (e: any) => {
    e.preventDefault()
    setDragging(false)
    const file = e.dataTransfer.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = () => {
        if (reader.readyState === 2) {
          formik.setFieldValue('thumbnail', reader.result)
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const { errors, touched, values, handleChange, handleSubmit, isValid, dirty } = formik
  return (
    <div className='w-[80%] m-auto mt-24 '>
      <form onSubmit={handleSubmit}>
        <div className='mb-5'>
          <label className={`${styles.label}`} htmlFor='name' >
            Course Name
          </label>
          <input
            type='text'
            name='name'
            value={values.name}
            onChange={handleChange}
            id='name'
            placeholder='MERN stack LMS platform with next 13'
            className={`
                    ${errors.name && touched.name && "border-red-500"}
                    ${styles.input}`}
          />
          {errors.name && touched.name && <span className="text-red-500 pt-2 block">{errors.name}</span>}
        </div>
        <div className='mb-5'>
          <label className={`${styles.label}`} htmlFor='description' >
            Course Description
          </label>
          <textarea
            name='description'
            cols={30}
            rows={8}
            value={values.description}
            onChange={handleChange}
            id='description'
            placeholder='Write something amazing...'
            className={`
              ${errors.description && touched.description && "border-red-500"}
              ${styles.input} !h-min !py-2`}
          />
          {errors.description && touched.description && <span className="text-red-500 pt-2 block">{errors.description}</span>}
        </div>
        <div className='w-full flex justify-between mb-5'>
          <div className='w-[45%]'>
            <label className={`${styles.label}`} htmlFor='price' >
              Course Price
            </label>
            <input
              type='number'
              name='price'
              value={values.price}
              onChange={handleChange}
              id='price'
              placeholder='9.99'
              className={`
                    ${errors.price && touched.price && "border-red-500"}
                    ${styles.input}`}
            />
            {errors.price && touched.price && <span className="text-red-500 pt-2 block">{errors.price}</span>}
          </div>
          <div className='w-[45%]'>
            <label className={`${styles.label}`} htmlFor='name' >
              Estimated Price (optional)
            </label>
            <input
              type='number'
              name='estimatePrice'
              value={values.estimatePrice}
              onChange={handleChange}
              id='estimatePrice'
              placeholder='9.99'
              className={`
                    ${errors.estimatePrice && touched.estimatePrice && "border-red-500"}
                    ${styles.input}`}
            />
            {errors.estimatePrice && touched.estimatePrice && <span className="text-red-500 pt-2 block">{errors.estimatePrice}</span>}
          </div>
        </div>
        <div className='mb-5'>
          <label className={`${styles.label}`} htmlFor='tags' >
            Course Tags
          </label>
          <input
            type='text'
            name='tags'
            value={values.tags}
            onChange={handleChange}
            id='tags'
            placeholder='MERN,Next 13,Socket io,tailwind css,LMS'
            className={`
                    ${errors.tags && touched.tags && "border-red-500"}
                    ${styles.input}`}
          />
          {errors.tags && touched.tags && <span className="text-red-500 pt-2 block">{errors.tags}</span>}
        </div>
        <div className='w-full flex justify-between mb-5'>
          <div className='w-[45%]'>
            <label className={`${styles.label}`} htmlFor='level' >
              Course Level
            </label>
            <input
              type='text'
              name='level'
              value={values.level}
              onChange={handleChange}
              id='level'
              placeholder='Beginner/Intermediate/Expert'
              className={`
                    ${errors.level && touched.level && "border-red-500"}
                    ${styles.input}`}
            />
            {errors.level && touched.level && <span className="text-red-500 pt-2 block">{errors.level}</span>}
          </div>
          <div className='w-[45%]'>
            <label className={`${styles.label}`} htmlFor='demoUrl' >
              Demo URL
            </label>
            <input
              type='text'
              name='demoUrl'
              value={values.demoUrl}
              onChange={handleChange}
              id='demoUrl'
              placeholder='Enter Demo Url'
              className={`
                    ${errors.demoUrl && touched.demoUrl && "border-red-500"}
                    ${styles.input}`}
            />
            {errors.demoUrl && touched.demoUrl && <span className="text-red-500 pt-2 block">{errors.demoUrl}</span>}
          </div>
        </div>
        <div className="w-full mb-5">
          <input
            type="file"
            accept="image/*"
            id="thumbnail"
            className="hidden mt-5"
            onChange={handleFileChange}
          />
          <label
            htmlFor="thumbnail"
            className={`w-full min-h-[10vh] dark:border-white border-[#00000026] p-3 border flex items-center justify-center ${dragging ? "bg-blue-500" : "bg-transparent"
              }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            {values.thumbnail ? (
              <Image
                src={values.thumbnail}
                alt=""
                width={100}
                height={100}
                className="max-h-full w-full object-cover"
              />
            ) : (
              <span className="text-black dark:text-white">
                Drag and drop your thumbnail here or click to browse
              </span>
            )}
          </label>
        </div>
        <div className="w-full flex items-center justify-end">
          <button type="submit" className={`w-full 800px:w-[180px] h-[40px] text-center text-[#fff] rounded mt-8 cursor-pointer ${!(isValid && dirty) ? 'bg-gray-500 cursor-not-allowed' : 'bg-[#37a39a]'}`} disabled={!(isValid && dirty)}>
            Next
          </button>
        </div>
      </form>
    </div>
  )
}

export default CourseInformation