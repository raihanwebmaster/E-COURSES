"use client"
import { styles } from '@/app/styles/styles';
import React, { FC, useEffect } from 'react'
import toast from 'react-hot-toast';
import { AiOutlineDelete, AiOutlinePlusCircle } from 'react-icons/ai';
import { BsLink45Deg, BsPencil } from 'react-icons/bs';
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
        const updatedLinks = [...updatedData[contentIndex].links];
        updatedLinks.splice(linkIndex, 1);
        updatedData[contentIndex] = { ...updatedData[contentIndex], links: updatedLinks };
        setCourseContent(updatedData);
    };
    const handleAddLink = (index: number) => {
        const updatedData = [...courseContent];
        updatedData[index].links.push({ title: "", url: "" });
        setCourseContent(updatedData);
    }
    const handleRemoveContent = (index: number) => {
        if (index > 0) {
            const updatedContent = [...courseContent]
            updatedContent.splice(index, 1)
            setCourseContent(updatedContent)

            const updatedCollapse = Array(updatedContent.length).fill(true)
            if (updatedContent.length > 0) {
                updatedCollapse[updatedContent.length - 1] = false
            }
            setIsCollapsed(updatedCollapse)
            const uniqueSections = Array.from(new Set(updatedContent.map(content => content.videoSection)));
            setActiveSection(uniqueSections.length);
        }
    }

    const newContentHandler = (content: any) => {
        const isContentInvalid = !content.title || !content.videoUrl || !content.description || !content.videoLength ||
            (content.links && content.links.some((link: any) => !link.title || !link.url));
        if (isContentInvalid) {
            toast.error("Please fill the previous content")
        }
        else {
            let newVideoSection = "Untitled Section";
            if (courseContent.length > 0) {
                newVideoSection = courseContent[courseContent.length - 1].videoSection;
            }
            const updatedData = [...courseContent];
            updatedData.push({
                videoUrl: "",
                title: "",
                description: "",
                videoSection: newVideoSection,
                videoLength: 0,
                links: [
                    {
                        title: "",
                        url: ""
                    }
                ],
                suggestion: ""
            });
            setCourseContent(updatedData)
            setIsCollapsed(Array(updatedData.length - 1).fill(true).concat(false));

        }
    }
    const addNewSection = () => {
        const lastContent = courseContent[courseContent.length - 1];
        const isContentInvalid = !lastContent.title || !lastContent.videoUrl || !lastContent.description || !lastContent.videoLength ||
            (lastContent.links && lastContent.links.some((link: any) => !link.title || !link.url));

        if (isContentInvalid) {
            toast.error("Please fill in all the fields of the last content before adding a new section");
            return;
        }
        else {
            setActiveSection(activeSection + 1)
            const newContent = {
                videoUrl: "",
                title: "",
                description: "",
                videoSection: `Untitled Section ${activeSection}`,
                videoLength: 0,
                links: [
                    {
                        title: "",
                        url: ""
                    }
                ],
                suggestion: ""
            }
            setCourseContent([...courseContent, newContent])
        }
    }
    const prevButton = () => {
        setActive(active - 1);
    }

    const handleOptions = () => {
        let isAnyContentInvalid = false;

        const updatedCollapse = courseContent.map((content: any) => {
            const isContentInvalid = !content.title ||
                !content.videoUrl ||
                !content.description || !content.videoLength ||
                (content.links && content.links.some((link: any) => !link.title || !link.url));

            if (isContentInvalid) {
                isAnyContentInvalid = true;
                return false;
            } else {
                return true;
            }
        });

        if (isAnyContentInvalid) {
            toast.error("Please fill in all the fields in every content before proceeding");
            setIsCollapsed(updatedCollapse);
            return;
        } else {
            setActive(active + 1);
            handleCourseSubmit();
        }
    };


    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);


    return (
        <div className='w-[80%] m-auto mt-24 p-3 '>
            <form onSubmit={handleSubmit}>
                {
                    courseContent.map((content: any, index: number) => {
                        const showSectionInput = index === 0 || content.videoSection !== courseContent[index - 1].videoSection
                        return (
                            <div className={`w-full bg-[#cdc8c817] p-4 ${showSectionInput ? "mt-10" : "mb-0"} `} key={index}>
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
                                                        updatedData[index] = { ...updatedData[index], videoSection: e.target.value };
                                                        setCourseContent(updatedData);
                                                    }}
                                                />
                                                <BsPencil className='cursor-pointer dark:text-white text-black' />
                                            </div>
                                            <br />

                                        </>
                                    )
                                }
                                <div className={`flex w-full items-center ${content.title === '' || !isCollapsed[index] ? "justify-end" : "justify-between"} my-0  dark:bg-[#111C43] bg-[#e0e1e6] p-5 hover:dark:bg-[#111c43e3] hover:bg-[#d4d6dd] `} >
                                    {
                                        isCollapsed[index] && (
                                            <>
                                                {
                                                    content.title && (
                                                        <p className='font-Poppins dark:text-white text-black'>
                                                            {index + 1}. {content.title}
                                                        </p>
                                                    )
                                                }
                                            </>
                                        )

                                    }
                                    {/* arrow button for collasped video content */}
                                    <div className="flex items-center">
                                        {
                                            index !== 0 && (
                                                <AiOutlineDelete
                                                    className={`dark:text-white text-black text-[20px] mr-2  ${index > 0 ? "cursor-pointer" : "cursor-no-drop"}`}
                                                    onClick={() => handleRemoveContent(index)}
                                                />
                                            )
                                        }
                                        <MdOutlineKeyboardArrowDown
                                            fontSize="large "
                                            className='dark:text-white text-black cursor-pointer'
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
                                                        updatedData[index] = { ...updatedData[index], title: e.target.value };
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
                                                        updatedData[index] = { ...updatedData[index], videoUrl: e.target.value };
                                                        setCourseContent(updatedData);
                                                    }}
                                                />
                                            </div>
                                            <div className='my-3' >
                                                <label className={styles.label}> Video Length (in minutes)</label>
                                                <input
                                                    type='number'
                                                    placeholder='Video length in minutes...'
                                                    className={`${styles.input}`}
                                                    value={content.videoLength || ""}
                                                    onChange={(e) => {
                                                        const updatedData = [...courseContent];
                                                        updatedData[index] = { ...updatedData[index], videoLength: Number(e.target.value) };
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
                                                        updatedData[index] = { ...updatedData[index], description: e.target.value };
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
                                                            {
                                                                linkIndex !== 0 && (
                                                                    <AiOutlineDelete
                                                                        className={`${linkIndex === 0 ? "cursor-no-drop" : "cursor-pointer"
                                                                            } text-black dark:text-white text-[20px]`}
                                                                        onClick={() => {
                                                                            if (linkIndex !== 0) {
                                                                                handleRemoveLink(index, linkIndex);
                                                                            }
                                                                        }}
                                                                    />
                                                                )
                                                            }
                                                        </div>

                                                        <input
                                                            type="text"
                                                            placeholder="Source Code... (Link title)"
                                                            className={styles.input}
                                                            value={link.title}
                                                            onChange={(e) => {
                                                                const updatedData = [...courseContent];
                                                                const updatedLinks = [...updatedData[index].links];
                                                                updatedLinks[linkIndex] = { ...updatedLinks[linkIndex], title: e.target.value };
                                                                updatedData[index] = { ...updatedData[index], links: updatedLinks };
                                                                setCourseContent(updatedData);
                                                            }}
                                                        />
                                                        <input
                                                            type="text"
                                                            placeholder="Source Url... (Link URL)"
                                                            className={styles.input}
                                                            value={link.url}
                                                            onChange={(e) => {
                                                                const updatedData = [...courseContent];
                                                                const updatedLinks = [...updatedData[index].links];
                                                                updatedLinks[linkIndex] = { ...updatedLinks[linkIndex], url: e.target.value };
                                                                updatedData[index] = { ...updatedData[index], links: updatedLinks };
                                                                setCourseContent(updatedData);
                                                            }}
                                                        
                                                        />

                                                    </div>
                                                ))
                                            }
                                            <br />
                                            {/* add link button */}
                                            <div className="inline-block mb-4">
                                                <p
                                                    className="flex items-center text-[18px] dark:text-white text-black cursor-pointer"
                                                    onClick={() => handleAddLink(index)}
                                                >
                                                    <BsLink45Deg className="mr-2" /> Add Link
                                                </p>
                                            </div>
                                        </>
                                    )
                                }
                                <br />
                                {/* add new content */}
                                {index === courseContent.length - 1 && (
                                    <div>
                                        <p
                                            className="flex items-center text-[18px] dark:text-white text-black cursor-pointer"
                                            onClick={(e: any) => newContentHandler(content)}
                                        >
                                            <AiOutlinePlusCircle className="mr-2" /> Add New Content
                                        </p>
                                    </div>
                                )}

                            </div>

                        )
                    })
                }
                <br />
                <div className='flex items-center text-[20px] dark:text-white text-black cursor-pointer' onClick={() => addNewSection()}>
                    <AiOutlinePlusCircle className='mr-2' />
                    Add New Section
                </div>
            </form>
            <br />
            <div className="w-full flex items-center justify-between">
                <div
                    className="w-full 800px:w-[180px] flex items-center justify-center h-[40px] bg-[#37a39a] text-center text-[#fff] rounded mt-8 cursor-pointer"
                    onClick={() => prevButton()}
                >
                    Prev
                </div>
                <div
                    className="w-full 800px:w-[180px] flex items-center justify-center h-[40px] bg-[#37a39a] text-center text-[#fff] rounded mt-8 cursor-pointer"
                    onClick={() => handleOptions()}
                >
                    Next
                </div>
            </div>
            <br />
            <br />
        </div>
    )
}

export default CourseContent