import { styles } from '../../../styles/styles';
import { useGetLayoutQuery } from '../../../../redux/features/layouts/layoutsApi';
import React, { useEffect, useState } from 'react'
import { HiMinus, HiPlus } from 'react-icons/hi';

type Props = {}

const Faq = (props: Props) => {
    const { data } = useGetLayoutQuery("FAQ", {
    });
    const [activeQuestion, setActiveQuestion] = useState(null);
    const [questions, setQuestions] = useState<any[]>([]);

    useEffect(() => {
        if (data) {
            setQuestions(data.data?.faq);
        }
    }, [data]);

    const toggleQuestion = (id: any) => {
        setActiveQuestion(activeQuestion === id ? null : id);
    };

    return (
        <div>
            <div className="w-[80%] 800px:w-[75%] m-auto">
                <h1 className={`${styles.title} 800px:!text-5xl`}>
                    Common {" "}
                    <span className="text-gradient">FAQ</span>{" "}
                </h1>
                <div className="flex items-center justify-center mt-5 space-x-2">
                    <span className="h-3 w-3 rounded-full bg-green-500"></span>
                    <h2 className="text-white text-xl font-semibold">Frequently asked questions</h2>
                </div>
                <div className="mt-12">
                    <dl className="space-y-8">
                        {questions?.map((q) => (
                            <div key={q.id}
                                className={`${q._id !== questions[0]?._id && "border-t"
                                    } border-gray-200 pt-6`}
                            >
                                <dt className="text-lg">
                                    <button
                                        className="flex items-start justify-between w-full text-left focus:outline-none"
                                        onClick={() => toggleQuestion(q._id)}
                                    >
                                        <span className="font-medium text-black dark:text-white">{q.question}</span>
                                        <span className="ml-6 flex-shrink-0">
                                            {activeQuestion === q._id ? (
                                                <HiMinus className="h-6 w-6 text-black dark:text-white" />
                                            ) : (
                                                <HiPlus className="h-6 w-6 text-black dark:text-white" />
                                            )}
                                        </span>
                                    </button>
                                </dt>
                                {activeQuestion === q._id && (
                                    <dd className="mt-2 pr-12">
                                        <p className="text-base font-Poppins text-black dark:text-white">{q.answer}</p>
                                    </dd>
                                )}
                            </div>
                        ))}
                    </dl>
                </div>
                <br />
                <br />
                <br />
            </div>
        </div>
    )
}

export default Faq