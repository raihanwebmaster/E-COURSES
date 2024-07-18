"use client"
import { styles } from '@/app/styles/styles';
import React, { FC } from 'react';
import { AiOutlinePlusCircle } from "react-icons/ai";
import InputSection from './Input/InputSection';
import toast from 'react-hot-toast';

type Props = {
    benefits: { title: string }[],
    setBenefits: (benefits: { title: string }[]) => void;
    preRequisites: { title: string }[],
    setPreRequisites: (preRequisites: { title: string }[]) => void;
    active: number;
    setActive: (active: number) => void;
}

const CourseData: FC<Props> = ({ benefits, setBenefits, preRequisites, setPreRequisites, active, setActive }) => {

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        index: number,
        state: { title: string }[],
        setState: (state: { title: string }[]) => void
    ) => {
        const updatedState = [...state];
        updatedState[index] = { ...updatedState[index], title: e.target.value }; 
        setState(updatedState);
    };

    const handleAdd = (state: { title: string }[], setState: (state: { title: string }[]) => void) => {
        setState([...state, { title: '' }]);
    };

    const prevButton = () => {
        setActive(active - 1);
    }

    const handleOptions = () => {
        if (benefits[benefits.length - 1]?.title !== "" && preRequisites[preRequisites.length - 1]?.title !== "") {
            setActive(active + 1);
        } else {
            toast.error("Please fill the fields to go to next step!")
        }
    };

    const handleDelete = (index: number, state: { title: string }[], setState: (state: { title: string }[]) => void) => {
        const updatedState = state.filter((_, i) => i !== index);
        setState(updatedState);
    };

    return (
        <div className='w-[80%] m-auto mt-24 block'>
            <InputSection
                title="What are the benefits for the students in this course?"
                items={benefits}
                onChange={(e, index) => handleChange(e, index, benefits, setBenefits)}
                onAdd={() => handleAdd(benefits, setBenefits)}
                onDelete={(index) => handleDelete(index, benefits, setBenefits)}
                placeholder="You will be able to build a full stack LMS Platform...."
            />
            <br />
            <InputSection
                title="What are the prerequisites for starting the course?"
                items={preRequisites}
                onChange={(e, index) => handleChange(e, index, preRequisites, setPreRequisites)}
                onAdd={() => handleAdd(preRequisites, setPreRequisites)}
                onDelete={(index) => handleDelete(index, preRequisites, setPreRequisites)}
                placeholder="You need basic knowledge of software development...."
            />
            <div className="w-full flex items-center justify-between">
                <div
                    className="w-full 800px:w-[180px] flex items-center justify-center h-[40px] bg-[#37a39a] text-center text-[#fff] rounded mt-8 cursor-pointer"
                    onClick={prevButton}
                >
                    Prev
                </div>
                <div
                    className="w-full 800px:w-[180px] flex items-center justify-center h-[40px] bg-[#37a39a] text-center text-[#fff] rounded mt-8 cursor-pointer"
                    onClick={handleOptions}
                >
                    Next
                </div>
            </div>
        </div>
    )
}

export default CourseData;
