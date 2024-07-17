import { styles } from '@/app/styles/styles';
import { useEditLayoutsMutation, useGetLayoutQuery } from '@/redux/features/layouts/layoutsApi';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { AiOutlineDelete } from 'react-icons/ai';
import { HiMinus, HiPlus } from 'react-icons/hi';
import { ImSpinner2 } from 'react-icons/im';
import { IoMdAddCircleOutline } from 'react-icons/io';

type Props = {}

const EditFAQ = (props: Props) => {
    const { data, refetch } = useGetLayoutQuery("FAQ", { refetchOnMountOrArgChange: true });
    const [questions, setQuestions] = useState<any[]>([]);
    const [editLayouts, { isLoading: editLoading, isSuccess, error }] = useEditLayoutsMutation()

    useEffect(() => {
        if (data) {
            setQuestions(data.data?.faq);
        }
    }, [data]);

    useEffect(() => {
        if (isSuccess) {
            refetch()
            toast.success("FAQ Updated successfully")
        }
        if (error) {
            if ('data' in error) {
                const errorData = error as any;
                toast.error(errorData.data.message)
            }
        }
    }, [isSuccess, error])

    const toggleQuestion = (id: string) => {
        setQuestions((prevQuestions) =>
            prevQuestions.map((item) =>
                item._id === id ? { ...item, active: !item.active } : item
            )
        );
    }

    const handleQuestionChange = (id: string, value: string) => {
        setQuestions((prevQuestions) =>
            prevQuestions.map((item) =>
                item._id === id ? { ...item, question: value } : item
            )
        );
    }

    const handleAnswerChange = (id: string, value: string) => {
        setQuestions((prevQuestions) =>
            prevQuestions.map((item) =>
                item._id === id ? { ...item, answer: value } : item
            )
        );
    }

    const newFaqHandler = () => {
        if (questions[questions.length - 1].question === "" || questions[questions.length - 1].answer === "") {
            toast.error("Question and Answer cannot be empty")
            return
        } else {
            setQuestions((prevQuestions) => [
                ...prevQuestions,
                {
                    question: "",
                    answer: "",
                },
            ]);
        }
    }

    const stripActiveProperty = (questions: any[]) => {
        return questions?.map(({ _id, question, answer }) => ({ _id, question, answer }));
    };

    const areQuestionsUnchanged = (originalQuestions: any[], newQuestions: any[]) => {
        const strippedOriginal = stripActiveProperty(originalQuestions);
        const strippedNew = stripActiveProperty(newQuestions);
        return JSON.stringify(strippedOriginal) === JSON.stringify(strippedNew);
    };

    const isAnyQuestionEmpty = (questions: any[]) => {
        return questions.some((item) => item.question === "" || item.answer === "");
    }

    const handleEdit = async () => {
        await editLayouts({
            type: "FAQ",
            faq: questions,
        });

    }



    return (
        <div className='w-[90%] 800px:w-[80%] m-auto mt-[120px]'>
            <h1 className={`${styles.title} 800px:text-[40px]`}>
                Frequently Asked Questions
            </h1>
            <div className='mt-12'>
                <dl className='space-y-8'>
                    {questions.map((q, index) => (
                        <div
                            key={q._id}
                            className={`${q._id !== questions[0]?._id && "border-t"
                                } border-gray-200 pt-6`}
                        >
                            <dt className='text-lg'>
                                <button className="flex items-start dark:text-white text-black justify-between w-full text-left focus:outline-none"

                                >
                                    <input
                                        className={`${styles.input} border-none`}
                                        value={q.question}
                                        onChange={(e: any) =>
                                            handleQuestionChange(q._id, e.target.value)
                                        }
                                        placeholder={"Add your question..."}
                                    />

                                    <span className="ml-6 flex-shrink-0">
                                        {q.active ? (
                                            <HiMinus className="h-6 w-6" onClick={() => toggleQuestion(q._id)} />
                                        ) : (
                                            <HiPlus className="h-6 w-6" onClick={() => toggleQuestion(q._id)} />
                                        )}
                                    </span>

                                </button>
                            </dt>
                            {q.active && (
                                <dd className="mt-2 pr-12">
                                    <input
                                        className={`${styles.input} border-none`}
                                        value={q.answer}
                                        onChange={(e: any) =>
                                            handleAnswerChange(q._id, e.target.value)
                                        }
                                        placeholder={"Add your answer..."}
                                    />
                                    <span className="flex-shrink-0 flex justify-end">
                                        <AiOutlineDelete
                                            className="dark:text-white text-black text-[18px] cursor-pointer"
                                            onClick={() => {
                                                setQuestions((prevQuestions) =>
                                                    prevQuestions.filter((item) => item._id !== q._id)
                                                );
                                            }}
                                        />
                                    </span>
                                </dd>
                            )}
                        </div>
                    ))}
                </dl>
                <br />
                <br />
                <IoMdAddCircleOutline className='dark:text-white text-black text-[25px] cursor-pointer ' onClick={newFaqHandler} />
                <div className={`${styles.button
                    } !w-[100px] !min-h-[40px] !h-[40px] dark:text-white text-black bg-[#cccccc34] ${areQuestionsUnchanged(data?.data?.faq, questions) || isAnyQuestionEmpty(questions)
                        ? "!cursor-not-allowed"
                        : "!cursor-pointer !bg-[#42d383]"
                    } !rounded absolute bottom-12 right-[7rem]`}
                    onClick={
                        areQuestionsUnchanged(data?.data.faq, questions) || isAnyQuestionEmpty(questions)
                            ? () => { }
                            : handleEdit
                    }
                >
                    {editLoading ? (
                        <ImSpinner2 className="animate-spin text-white" size={24} />
                    ) : (
                        "Save"
                    )}
                </div>
            </div>

        </div>
    )
}

export default EditFAQ