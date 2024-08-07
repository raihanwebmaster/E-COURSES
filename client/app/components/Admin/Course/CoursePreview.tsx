import { styles } from '../../../styles/styles'
import CoursePlayer from '../../../utils/CoursePlayer'
import Ratings from '../../../utils/Ratings'
import React, { FC, useEffect } from 'react'
import { ImSpinner2 } from 'react-icons/im';
import { IoCheckmarkDoneOutline } from "react-icons/io5";

type Props = {
    active: number
    setActive: (active: number) => void
    courseData: any
    handleCourseCreate: any,
    isLoading: boolean,
    isEdit?: boolean,

}

const CoursePreview: FC<Props> = ({ active, setActive, courseData, handleCourseCreate, isLoading, isEdit }) => {
    let discountPercentage;
    if (courseData?.estimatePrice === 0) {
        discountPercentage = 0;
    } else {
        discountPercentage = ((courseData?.estimatePrice - courseData?.price) / courseData?.estimatePrice) * 100;
    }

    const discountPercentagePrice = discountPercentage.toFixed(0);

    const prevButton = () => {
        setActive(active - 1);
    }
    const createCourse = () => {
        !isLoading && handleCourseCreate();
    }
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <div className="w-[90%] m-auto py-5 mb-5 " >
            <div className='w-full relative' >
                <div className='w-full mt-10' >
                    <CoursePlayer videoUrl={courseData?.demoUrl} title={courseData?.title} />
                </div>
                <div className="flex items-center dark:text-white text-black">
                    <h1 className="pt-5 text-[25px]">
                        {courseData?.price === 0 ? "Free" : courseData?.price + "$"}
                    </h1>
                    <h5 className="pl-3 text-[20px] mt-2 line-through opacity-80">
                        {courseData?.estimatePrice}$
                    </h5>
                    <h4 className="pl-5 pt-4 text-[22px]">
                        {discountPercentagePrice}% Off
                    </h4>
                </div>
                <div className="flex items-center">
                    <div
                        className={`${styles.button} !w-[180px] my-3 font-Poppins !bg-[crimson] cursor-not-allowed dark:text-white text-black`}
                    >
                        Buy Now {courseData?.price}$
                    </div>
                </div>
                <div className="flex items-center">
                    <input
                        type="text"
                        name=""
                        id=""
                        placeholder="Discount code..."
                        className={`${styles.input} 1500px:!w-[50%] 1100px:w-[60%] !mt-0`}
                    />
                    <div
                        className={`${styles.button} !w-[120px] my-3 ml-4 font-Poppins cursor-pointer`}
                    >
                        Apply
                    </div>
                </div>
                <p className="pb-1 dark:text-white text-black">• Source code included</p>
                <p className="pb-1 dark:text-white text-black">• Full lifetime access</p>
                <p className="pb-1 dark:text-white text-black">• Certificate of completion</p>
                <p className="pb-3 800px:pb-1 dark:text-white text-black">• Premium Support</p>
            </div>
            <div className="w-full">
                <div className="w-full 800px:pr-5">
                    <h1 className="text-[25px] font-Poppins font-[600] dark:text-white text-black">
                        {courseData?.name}
                    </h1>
                    <div className="flex items-center justify-between pt-3">
                        <div className="flex items-center dark:text-white text-black">
                            <Ratings rating={0} />
                            <h5>0 Reviews</h5>
                        </div>
                        <h5 className="dark:text-white text-black">0 Students</h5>
                    </div>
                </div>
                <br />
                <div className="text-[25px] font-Poppins font-[600] dark:text-white text-black">
                    What you will learn from this course?
                </div>
                {courseData?.benefits?.map((item: any, index: number) => (
                    <div className="w-full flex 800px:items-center py-2 dark:text-white text-black" key={index}>
                        <div className="w-[15px] mr-1">
                            <IoCheckmarkDoneOutline size={20} />
                        </div>
                        <p className="pl-2">{item.title}</p>
                    </div>
                ))}
                <br />
                <br />
                <h1 className="text-[25px] font-Poppins font-[600] dark:text-white text-black">
                    What are the prerequisites for starting this course?
                </h1>
                {courseData?.prerequisites?.map((item: any, index: number) => (
                    <div className="w-full flex 800px:items-center py-2 dark:text-white text-black" key={index}>
                        <div className="w-[15px] mr-1">
                            <IoCheckmarkDoneOutline size={20} />
                        </div>
                        <p className="pl-2">{item.title}</p>
                    </div>
                ))}
                <br />
                <br />

                {/* course description */}
                <div className="w-full dark:text-white text-black">
                    <h1 className="text-[25px] font-Poppins font-[600]">
                        Course Details
                    </h1>
                    <p className="text-[18px] mt-[20px] whitespace-pre-line w-full overflow-hidden">
                        {courseData?.description}
                    </p>
                </div>
                <br />
                <br />
            </div>
            <div className="w-full flex items-center justify-between">
                <div
                    className="w-full 800px:w-[180px] flex items-center justify-center h-[40px] bg-[#37a39a] text-center text-[#fff] rounded mt-8 cursor-pointer"
                    onClick={() => prevButton()}
                >
                    Prev
                </div>
                <div
                    className="w-full 800px:w-[180px] flex items-center justify-center h-[40px] bg-[#37a39a] text-center text-[#fff] rounded mt-8 cursor-pointer"
                    onClick={() => createCourse()}
                >
                    {isLoading ? (
                        <ImSpinner2 className="animate-spin text-white" size={24} />
                    ) : (
                        isEdit ? "Update" : "Create"
                    )}
                </div>
            </div>

        </div>
    )
}

export default CoursePreview