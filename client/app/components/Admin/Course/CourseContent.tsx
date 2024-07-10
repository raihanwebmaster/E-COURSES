import { styles } from '@/app/styles/styles';
import React, { FC } from 'react'
import { AiOutlineDelete } from 'react-icons/ai';
import { BsPencil } from 'react-icons/bs';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';

type Props = {
    courseContent: any
    setCourseContent: (courseContent: any) => void
    active: number
    setActive: (active: number) => void
    handleSubmit: any;
}

const CourseContent: FC<Props> = ({ courseContent, setCourseContent, active, setActive, handleSubmit: handleCourseSubmit }) => {
    const [isCollapsed, setIsCollapsed] = React.useState(Array(courseContent.length).fill(false))
    const [activeSection, setActiveSection] = React.useState(1)
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
    }
    const handleCollapseToggle = (index: number) => {
        const updatedCollapse = [...isCollapsed]
        updatedCollapse[index] = !updatedCollapse[index]
        setIsCollapsed(updatedCollapse)
    }
    const handleRemoveLink = (contentIndex: number, linkIndex: number) => {
        const updatedData = [...courseContent];
        updatedData[contentIndex].links.splice(linkIndex, 1);
        setCourseContent(updatedData);
    }
    return (
        <div className='w-[80%] m-auto mt-24 p-3 '>
            <form onSubmit={handleSubmit}>
                {
                    courseContent.map((content: any, index: number) => {
                        const showSectionInput = index === 0 || content.videoSection !== courseContent[index - 1].videoSection
                        return (
                            <>
                                <div className={`w-full bg-[#cdc8c817] p-4 ${showSectionInput ? "mt-10" : "mb-0"} `}>
                                    {
                                        showSectionInput && (
                                            <>
                                                <div className='flex w-full items-center' >
                                                    <input
                                                        type="text"
                                                        className={`text-[20px] ${content.videoSection === "Untitled Section" ? "w-[170px]" : "w-min"} font-Poppins cursor-pointer dark:text-white text-black bg-transparent outline-none`}
                                                        value={content.videoSection}
                                                        onChange={(e) => {
                                                            const updatedData = [...courseContent];
                                                            updatedData[index].videoSection = e.target.value;
                                                            setCourseContent(updatedData);
                                                        }}
                                                    />
                                                    <BsPencil className='cursor-pointer dark:text-white text-black' />
                                                </div>
                                                <br />

                                            </>
                                        )
                                    }
                                    <div className='flex w-full items-center justify-between my-0' >
                                        {
                                            isCollapsed[index] ? (
                                                <>
                                                    {
                                                        content.title ? (
                                                            <p className='font-Poppins dark:text-white text-black'>
                                                                {index + 1}. {content.title}
                                                            </p>
                                                        ) : (
                                                            <></>
                                                        )
                                                    }
                                                </>
                                            ) : (
                                                <div>

                                                </div>
                                            )
                                        }
                                        {/* arrow button for collasped video content */}
                                        <div className="flex items-center">
                                            <AiOutlineDelete
                                                className={`dark:text-white text-black text-[20px] mr-2  ${index > 0 ? "cursor-pointer" : "cursor-no-drop"}`}
                                                onClick={() => {
                                                    if (index > 0) {
                                                        const updatedContent = [...courseContent]
                                                        updatedContent.splice(index, 1)
                                                        setCourseContent(updatedContent)
                                                    }
                                                }}
                                            />
                                            <MdOutlineKeyboardArrowDown
                                                fontSize="large "
                                                className='dark:text-white text-black'
                                                style={{
                                                    transform: isCollapsed[index] ? "rotate(180deg)" : "rotate(0deg)"
                                                }}
                                                onClick={() => handleCollapseToggle(index)}
                                            />
                                        </div>
                                    </div>
                                    {
                                        !isCollapsed[index] && (
                                            <>
                                                <div className='my-3' >
                                                    <label className={styles.label}> Video Title</label>
                                                    <input
                                                        type='text'
                                                        placeholder='Prject Plan...'
                                                        className={`${styles.input}`}
                                                        value={content.title}
                                                        onChange={(e) => {
                                                            const updatedData = [...courseContent];
                                                            updatedData[index].title = e.target.value;
                                                            setCourseContent(updatedData);
                                                        }}
                                                    />
                                                </div>
                                                <div className='my-3' >
                                                    <label className={styles.label}> Video Url</label>
                                                    <input
                                                        type='text'
                                                        placeholder='https://www.youtube.com/watch?v=...'
                                                        className={`${styles.input}`}
                                                        value={content.videoUrl}
                                                        onChange={(e) => {
                                                            const updatedData = [...courseContent];
                                                            updatedData[index].videoUrl = e.target.value;
                                                            setCourseContent(updatedData);
                                                        }}
                                                    />
                                                </div>
                                                <div className='my-3' >
                                                    <label className={styles.label}> Video Description</label>
                                                    <textarea
                                                        rows={8}
                                                        cols={30}
                                                        placeholder='This video will help you to understand the project plan...'
                                                        className={`${styles.input} !h-min`}
                                                        value={content.description}
                                                        onChange={(e) => {
                                                            const updatedData = [...courseContent];
                                                            updatedData[index].description = e.target.value;
                                                            setCourseContent(updatedData);
                                                        }}
                                                    />
                                                    <br />
                                                </div>
                                                {
                                                    content.links.map((link: any, linkIndex: number) => (
                                                        <div className='mb-3 block' key={linkIndex}>
                                                            <div className='w-full flex items-center justify-between' >
                                                                <label className={styles.label}>
                                                                    Link {linkIndex + 1}
                                                                </label>
                                                                <AiOutlineDelete
                                                                    className={`${linkIndex === 0 ? "cursor-no-drop" : "cursor-pointer"
                                                                        } text-black dark:text-white text-[20px]`}
                                                                    onClick={() => {
                                                                        if (linkIndex !== 0) {
                                                                            handleRemoveLink(index, linkIndex);
                                                                        }
                                                                    }}
                                                                />
                                                            </div>

                                                            <input
                                                                type="text"
                                                                placeholder="Source Code... (Link title)"
                                                                className={styles.input}
                                                                value={link.title}
                                                                onChange={(e) => {
                                                                    const updatedData = [...courseContent];
                                                                    updatedData[index].links[linkIndex].title = e.target.value;
                                                                    setCourseContent(updatedData);
                                                                }}
                                                            />

                                                        </div>
                                                    ))
                                                }
                                            </>
                                        )
                                    }
                                </div>
                            </>
                        )
                    })
                }
            </form>
        </div>
    )
}

export default CourseContent