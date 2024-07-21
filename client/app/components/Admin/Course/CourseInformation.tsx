import { styles } from '@/app/styles/styles';
import { useGetLayoutQuery } from '@/redux/features/layouts/layoutsApi';
import { OutlinedInput, Select, MenuItem } from '@mui/material';
import { GridExpandMoreIcon } from '@mui/x-data-grid';
import { useFormik } from 'formik';
import { useTheme } from 'next-themes';
import React, { FC, useState, useEffect } from 'react'
import * as Yup from 'yup'
import Image from 'next/image'

type Props = {
  courseInfo: {
    name: string,
    description: string,
    price: number,
    estimatePrice: number,
    tags: string,
    level: string,
    demoUrl: string,
    thumbnail: string,
    categories: string[],

  };
  setCourseInfo: (courseInfo: any) => void;
  active: number;
  setActive: (active: number) => void;
}

const schema = Yup.object().shape({
  name: Yup.string().required("Please enter the course name!"),
  description: Yup.string().required("Please enter the course description!"),
  price: Yup.number().min(0.01, 'Please enter the course price!').required('Please enter the course price!'),
  estimatePrice: Yup.number().optional(),
  tags: Yup.string().required("Please enter the course tags!"),
  level: Yup.string().required("Please enter the course level!"),
  demoUrl: Yup.string().required("Please enter the course demo URL!"),
  thumbnail: Yup.mixed().required("Please upload the course thumbnail!"),
  categories: Yup.array()
    .min(1, "Please select at least one category!")
    .required("Please enter the course categories!"),
})

const CourseInformation: FC<Props> = ({ courseInfo, setCourseInfo, active, setActive }) => {
  const { data } = useGetLayoutQuery("Categories", {});
  const { resolvedTheme } = useTheme();
  const [dragging, setDragging] = React.useState(false)
  const [initialValues, setInitialValues] = useState(courseInfo);
  const [categories, setCategories] = useState<any[]>([]);
  useEffect(() => {
    if (data) {
      setCategories(data.data.categories);
    }
  }, [data]);

  useEffect(() => {
    setInitialValues(courseInfo);
  }, [courseInfo]);


  const formik = useFormik({
    initialValues: initialValues,
    enableReinitialize: true,
    validationSchema: schema,
    onSubmit: async (values) => {
      if (typeof values.estimatePrice === "string" && (values.estimatePrice === "" || values.estimatePrice == null)) {
        values.estimatePrice = 0;
      }
      setCourseInfo(values)
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
  const handleCategoriesChange = (event: any) => {
    const {
      target: { value },
    } = event;
    formik.setFieldValue('categories', typeof value === 'string' ? value.split(',') : value);
  };

  const getCategoryTitleById = (id: string) => {
    const category = categories.find((category) => category._id === id);
    return category ? category.title : '';
  };


  const { errors, touched, values, handleChange, handleSubmit, isValid } = formik
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
              value={values.price || ''}
              onChange={handleChange}
              onWheel={(e) => (e.target as HTMLInputElement).blur()}
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
              value={values.estimatePrice || ''}
              onChange={handleChange}
              onWheel={(e) => (e.target as HTMLInputElement).blur()}
              id='estimatePrice'
              placeholder='9.99'
              className={`
                    ${errors.estimatePrice && touched.estimatePrice && "border-red-500"}
                    ${styles.input}`}
            />
            {errors.estimatePrice && touched.estimatePrice && <span className="text-red-500 pt-2 block">{errors.estimatePrice}</span>}
          </div>
        </div>
        <div className='w-full flex justify-between mb-5'>
          <div className='w-[45%]'>
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
          <div className='w-[45%]'>
            <label className={`${styles.label}`} htmlFor='demoUrl' >
              Course Categories
            </label>
            <Select
              multiple
              displayEmpty
              value={values.categories}
              onChange={handleCategoriesChange}
              MenuProps={{ disableScrollLock: true }} 
              input={<OutlinedInput
                className={`
                  ${errors.categories && touched.categories && "border-red-500"}
                  ${styles.input}`}
              />}
              sx={{
                '&.MuiOutlinedInput-root': {
                    '& fieldset': {
                      border: 'none',
                    },
                  },
                  '&.Mui-focused': {
                    '& fieldset': {
                      border: 'none',
                    },
                  },
                '& .MuiSelect-icon': {
                  color: `${resolvedTheme !== "dark" ? "#000" : "#fff"}`,
                },
              }}
              renderValue={(selected) => {
                if (selected.length === 0) {
                  return <p className="text-gray-500">Placeholder</p>;
                }

                return selected.map((value) => getCategoryTitleById(value)).join(', ');
              }}
              
            >
              <MenuItem disabled value="">
                <p>Placeholder</p>
              </MenuItem>
              {categories.map((category) => (
                <MenuItem
                  key={category._id}
                  value={category._id}
                // style={getStyles(name, personName, theme)}
                >
                  {category.title}
                </MenuItem>
              ))}
            </Select>
            {errors.categories && touched.categories && <span className="text-red-500 pt-2 block">{errors.categories}</span>}
          </div>
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
            className={`w-full min-h-[10vh]  p-3 border flex items-center justify-center ${dragging ? "bg-blue-500" : errors.thumbnail && touched.thumbnail ? 'border-red-500' : 'dark:border-white border-[#00000026]'
              }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            {values.thumbnail ? (
              <Image
                src={values.thumbnail}
                alt=""
                width= {1000}
                height= {500}
                quality={100}
                className="max-h-full w-full object-cover"
              />
            ) : (
              <span className="text-black dark:text-white">
                Drag and drop your thumbnail here or click to browse
              </span>
            )}
          </label>
        </div>
        <div className="w-full flex items-center justify-end mb-5">
          <button type="submit" className={`w-full 800px:w-[180px] flex items-center justify-center h-[40px] bg-[#37a39a] text-center text-[#fff] rounded mt-8 cursor-pointer`} >
            Next
          </button>
        </div>
      </form>
    </div>
  )
}

export default CourseInformation