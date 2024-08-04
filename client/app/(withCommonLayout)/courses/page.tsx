"use client";
import Loader from "@/app/components/Loader/Loader";
import CourseCard from "@/app/components/Route/Course/CourseCard";
import { styles } from "@/app/styles/styles";
import Heading from "@/app/utils/Heading";
import { useGetAllCoursesQuery, useGetAllCoursesWithOutPurchaseQuery } from "@/redux/features/courses/coursesApi";
import { useGetLayoutQuery } from "@/redux/features/layouts/layoutsApi";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

type Props = {};

const Page = (props: Props) => {
    const searchParams = useSearchParams();
    const search = searchParams?.get("title");
    const { data, isLoading } = useGetAllCoursesWithOutPurchaseQuery(undefined, {});
    const { data: categoriesData } = useGetLayoutQuery("Categories", {});
    const [route, setRoute] = useState("Login");
    const [open, setOpen] = useState(false);
    const [courses, setCourses] = useState([]);
    const [category, setCategory] = useState("All");

    useEffect(() => {
        if (data?.data) {
            let filteredCourses = data.data;

            if (category !== "All") {
                filteredCourses = filteredCourses.filter((item: any) => item.categories.includes(category));
            }

            if (search) {
                filteredCourses = filteredCourses.filter((item: any) =>
                    item.name.toLowerCase().includes(search.toLowerCase())
                );
            }

            setCourses(filteredCourses);
        }
    }, [data, category, search]);

    const categories = categoriesData?.data?.categories;

    return (
        <div>
            <Heading
                title={"All courses - Elearning"}
                description={"Elearning is a programming community."}
                keywords={
                    "programming community, coding skills, expert insights, collaboration, growth"
                }
            />
            {isLoading ? (
                <Loader />
            ) : (
                <>
                    <div className="w-[95%] 800px:w-[85%] m-auto min-h-[70vh]">
                        <br />
                        <div className="w-full flex items-center flex-wrap">
                            <div
                                className={`h-[35px] ${category === "All" ? "bg-[crimson]" : "bg-[#5050cb]"
                                    } m-3 px-3 rounded-[30px] flex items-center justify-center font-Poppins cursor-pointer`}
                                onClick={() => setCategory("All")}
                            >
                                All
                            </div>
                            {categories &&
                                categories.map((item: any, index: number) => (
                                    <div key={index}>
                                        <div
                                            className={`h-[35px] ${category === item._id
                                                    ? "bg-[crimson]"
                                                    : "bg-[#5050cb]"
                                                } m-3 px-3 rounded-[30px] flex items-center justify-center font-Poppins cursor-pointer`}
                                            onClick={() => setCategory(item._id)}
                                        >
                                            {item.title}
                                        </div>
                                    </div>
                                ))}
                        </div>
                        {
                            courses && courses.length === 0 && (
                                <p className={`${styles.label} justify-center min-h-[50vh] flex items-center`}>
                                    {search ? "No courses found!" : "No courses found in this category. Please try another one!"}
                                </p>
                            )
                        }
                        <br />
                        <br />
                        <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 lg:gap-[25px] 1500px:grid-cols-4 1500px:gap-[35px] mb-12 border-0">
                            {courses &&
                                courses.map((item: any, index: number) => (
                                    <CourseCard item={item} key={index} />
                                ))}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default Page;
