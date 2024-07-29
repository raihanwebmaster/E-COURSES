import { styles } from '@/app/styles/styles'
import CoursePlayer from '@/app/utils/CoursePlayer'
import Ratings from '@/app/utils/Ratings'
import { useGetCourseWithOutPurchaseQuery } from '@/redux/features/courses/coursesApi'
import Image from 'next/image'
import React, { FC, useState } from 'react'
import { AiFillStar, AiOutlineArrowLeft, AiOutlineArrowRight, AiOutlineStar } from 'react-icons/ai'
import { useSelector } from 'react-redux'
import { format } from 'timeago.js'

type Props = {
    courseContent: any,
    activeVideo: number,
    setActiveVideo: (activeVideo: number) => void,
    id: string
}

const CourseContentMedia: FC<Props> = ({ courseContent, activeVideo, setActiveVideo, id }) => {
    const [activeBar, setActiveBar] = React.useState(0)
    const { user } = useSelector((state: any) => state.auth);
    const [question, setQuestion] = React.useState("")
    const { data: courseData, refetch: courseRefetch } = useGetCourseWithOutPurchaseQuery(
        id,
        { refetchOnMountOrArgChange: true }
    );
    const course = courseData?.data;
    const isReviewExists = course?.reviews?.find(
        (item: any) => item.user._id === user._id
    );
    const [rating, setRating] = useState(1);
    const [review, setReview] = useState("");
    return (
        <div className='w-[95%] 800px:w-[60%] py-4 m-auto'>
            <CoursePlayer
                title={courseContent[activeVideo].title}
                videoUrl={courseContent[activeVideo].videoUrl}

            />
            <div className="w-full flex items-center justify-between my-3">
                <div
                    className={` ${styles.button} cursor-pointer !w-[unset] !min-h-[40px] !py-[unset] ${activeVideo === 0 && "!cursor-no-drop opacity-[.8]"
                        }`}
                    onClick={() => {
                        setActiveVideo(activeVideo === 0 ? 0 : activeVideo - 1),
                            setActiveBar(0)

                    }

                    }
                >
                    <AiOutlineArrowLeft className='mr-2' />
                    Prev Lesson
                </div>
                <div
                    className={` ${styles.button} cursor-pointer !w-[unset] !min-h-[40px] !py-[unset] ${courseContent.length - 1 === activeVideo && "!cursor-no-drop opacity-[.8]"
                        }`}
                    onClick={() => {
                        setActiveVideo(
                            courseContent && courseContent.length - 1 === activeVideo
                                ? activeVideo
                                : activeVideo + 1
                        ),
                            setActiveBar(0)
                    }
                    }
                >
                    Next Lesson
                    <AiOutlineArrowRight className="ml-2" />
                </div>

            </div>

            <h1 className='pt-2 text-[25px] font-[600] dark:text-white text-black'> {courseContent[activeVideo].title} </h1>
            <br />

            <div className="w-full p-4 flex items-center justify-between bg-slate-500 bg-opacity-20 backdrop-blur shadow-[bg-slate-700] rounded shadow-inner">
                {["Overview", "Resources", "Q&A", "Reviews"].map((text, index) => (
                    <h5
                        key={index}
                        className={`800px:text-[20px] cursor-pointer dark:text-white text-black ${activeBar === index && "!text-red-500"
                            }`}
                        onClick={() => setActiveBar(index)}
                    >
                        {text}
                    </h5>
                ))}
            </div>
            <br />
            {
                activeBar === 0 && (
                    <p className='text-[18px] whitespace-pre-line mb-3 dark:text-white text-black ' >
                        {courseContent[activeVideo].description}
                    </p>
                )
            }

            {activeBar === 1 && (
                <div>
                    {courseContent[activeVideo]?.links.map((item: any, index: number) => (
                        <div className="mb-5" key={index}>
                            <h2 className="800px:text-[20px] 800px:inline-block dark:text-white text-black">
                                {item.title && item.title + " :"}
                            </h2>
                            <a
                                className="inline-block text-[#4395c4] 800px:text-[20px] 800px:pl-2"
                                href={item.url}
                            >
                                {item.url}
                            </a>
                        </div>
                    ))}
                </div>
            )}

            {activeBar === 2 && (
                <>
                    <div className="flex w-full">
                        <Image
                            src={
                                user.avatar
                                    ? user.avatar.url
                                    : "https://res.cloudinary.com/dshp9jnuy/image/upload/v1665822253/avatars/nrxsg8sd9iy10bbsoenn.png"
                            }
                            width={50}
                            height={50}
                            alt=""
                            className="w-[50px] h-[50px] rounded-full object-cover"
                        />
                        <textarea
                            name=""
                            value={question}
                            onChange={(e) => setQuestion(e.target.value)}
                            id=""
                            cols={40}
                            rows={5}
                            placeholder="Write your question..."
                            className="outline-none bg-transparent ml-3 border dark:text-white text-black border-[#0000001d] dark:border-[#ffffff57] 800px:w-full p-2 rounded w-[90%] 800px:text-[18px] font-Poppins"
                        ></textarea>
                    </div>
                    <div className="w-full flex justify-end">
                        <div
                            className={`${styles.button
                                } !w-[120px] !h-[40px] text-[18px] mt-5`}
                        // onClick={questionCreationLoading ? () => { } : handleQuestion}
                        >
                            Submit
                        </div>
                    </div>
                    <br />
                    <br />
                    <div className="w-full h-[1px] bg-[#ffffff3b]"></div>
                    <div>
                        {/* <CommentReply
                            data={data}
                            activeVideo={activeVideo}
                            answer={answer}
                            setAnswer={setAnswer}
                            handleAnswerSubmit={handleAnswerSubmit}
                            user={user}
                            questionId={questionId}
                            setQuestionId={setQuestionId}
                            answerCreationLoading={answerCreationLoading}
                        /> */}
                    </div>
                </>
            )}

            {activeBar === 3 && (
                <div className="w-full">
                    <>
                        {!isReviewExists && (
                            <>
                                <div className="flex w-full">
                                    <Image
                                        src={
                                            user.avatar
                                                ? user.avatar.url
                                                : "https://res.cloudinary.com/dshp9jnuy/image/upload/v1665822253/avatars/nrxsg8sd9iy10bbsoenn.png"
                                        }
                                        width={50}
                                        height={50}
                                        alt=""
                                        className="w-[50px] h-[50px] rounded-full object-cover"
                                    />
                                    <div className="w-full">
                                        <h5 className="pl-3 text-[20px] font-[500] dark:text-white text-black ">
                                            Give a Rating <span className="text-red-500">*</span>
                                        </h5>
                                        <div className="flex w-full ml-2 pb-3">
                                            {[1, 2, 3, 4, 5].map((i) =>
                                                rating >= i ? (
                                                    <AiFillStar
                                                        key={i}
                                                        className="mr-1 cursor-pointer"
                                                        color="rgb(246,186,0)"
                                                        size={25}
                                                        onClick={() => setRating(i)}
                                                    />
                                                ) : (
                                                    <AiOutlineStar
                                                        key={i}
                                                        className="mr-1 cursor-pointer"
                                                        color="rgb(246,186,0)"
                                                        size={25}
                                                        onClick={() => setRating(i)}
                                                    />
                                                )
                                            )}
                                        </div>
                                        <textarea
                                            name=""
                                            value={review}
                                            onChange={(e) => setReview(e.target.value)}
                                            id=""
                                            cols={40}
                                            rows={5}
                                            placeholder="Write your comment..."
                                            className="outline-none bg-transparent 800px:ml-3 dark:text-white text-black border border-[#00000027] dark:border-[#ffffff57] w-[95%] 800px:w-full p-2 rounded text-[18px] font-Poppins"
                                        ></textarea>
                                    </div>
                                </div>
                                <div className="w-full flex justify-end">
                                    <div
                                        className={`${styles.button
                                            } !w-[120px] !h-[40px] text-[18px] mt-5 800px:mr-0 mr-2`}
                                    // onClick={
                                    //     reviewCreationLoading ? () => { } : handleReviewSubmit
                                    // }
                                    >
                                        Submit
                                    </div>
                                </div>
                            </>
                        )}
                        <br />
                        <div className="w-full h-[1px] bg-[#ffffff3b]"></div>
                        {/* <div className="w-full">
                            {(course?.reviews && [...course.reviews].reverse())?.map(
                                (item: any, index: number) => {

                                    return (
                                        <div className="w-full my-5 dark:text-white text-black" key={index}>
                                            <div className="w-full flex">
                                                <div>
                                                    <Image
                                                        src={
                                                            item.user.avatar
                                                                ? item.user.avatar.url
                                                                : "https://res.cloudinary.com/dshp9jnuy/image/upload/v1665822253/avatars/nrxsg8sd9iy10bbsoenn.png"
                                                        }
                                                        width={50}
                                                        height={50}
                                                        alt=""
                                                        className="w-[50px] h-[50px] rounded-full object-cover"
                                                    />
                                                </div>
                                                <div className="ml-2">
                                                    <h1 className="text-[18px]">{item?.user.name}</h1>
                                                    <Ratings rating={item.rating} />
                                                    <p>{item.comment}</p>
                                                    <small className="text-[#0000009e] dark:text-[#ffffff83]">
                                                        {format(item.createdAt)} •
                                                    </small>
                                                </div>
                                            </div>
                                            {user.role === "admin" && item.commentReplies.length === 0 && (
                                                <span
                                                    className={`${styles.label} !ml-10 cursor-pointer`}
                                                    onClick={() => {
                                                        setIsReviewReply(true);
                                                        setReviewId(item._id);
                                                    }}
                                                >
                                                    Add Reply
                                                </span>
                                            )}

                                            {isReviewReply && reviewId === item._id && (
                                                <div className="w-full flex relative">
                                                    <input
                                                        type="text"
                                                        placeholder="Enter your reply..."
                                                        value={reply}
                                                        onChange={(e: any) => setReply(e.target.value)}
                                                        className="block 800px:ml-12 mt-2 outline-none bg-transparent border-b border-[#000] dark:border-[#fff] p-[5px] w-[95%]"
                                                    />
                                                    <button
                                                        type="submit"
                                                        className="absolute right-0 bottom-1"
                                                        onClick={handleReviewReplySubmit}
                                                    >
                                                        Submit
                                                    </button>
                                                </div>
                                            )}

                                            {item.commentReplies.map((i: any, index: number) => (
                                                <div className="w-full flex 800px:ml-16 my-5" key={index}>
                                                    <div className="w-[50px] h-[50px]">
                                                        <Image
                                                            src={
                                                                i.user.avatar
                                                                    ? i.user.avatar.url
                                                                    : "https://res.cloudinary.com/dshp9jnuy/image/upload/v1665822253/avatars/nrxsg8sd9iy10bbsoenn.png"
                                                            }
                                                            width={50}
                                                            height={50}
                                                            alt=""
                                                            className="w-[50px] h-[50px] rounded-full object-cover"
                                                        />
                                                    </div>
                                                    <div className="pl-2">
                                                        <div className="flex items-center">
                                                            <h5 className="text-[20px]">{i.user.name}</h5>{" "}
                                                            <VscVerifiedFilled className="text-[#0095F6] ml-2 text-[20px]" />
                                                        </div>
                                                        <p>{i.comment}</p>
                                                        <small className="text-[#ffffff83]">
                                                            {format(i.createdAt)} •
                                                        </small>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    );
                                }
                            )}
                        </div> */}
                    </>
                </div>
            )}

        </div>
    )
}

export default CourseContentMedia