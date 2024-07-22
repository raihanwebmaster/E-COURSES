"use client";
import { styles } from '../../../../styles/styles';
import React, { FC } from 'react';
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai";

type Props = {
    title: string;
    items: { title: string }[];
    onChange: (e: React.ChangeEvent<HTMLInputElement>, index: number) => void;
    onAdd: () => void;
    onDelete: (index: number) => void;
    placeholder: string;
}

const InputSection: FC<Props> = ({ title, items, onChange, onAdd, placeholder, onDelete }) => (
    <div>
        <label className={`${styles.label} text=[20px]`} htmlFor={title}>
            {title}
        </label>
        {
            items.map((item, index) => (
                <div key={index} className="relative">
                    <input
                        type="text"
                        name={title}
                        placeholder={placeholder}
                        className={`${styles.input} my-2`}
                        required
                        value={item.title}
                        onChange={(e) => onChange(e, index)}
                    />
                    {items.length > 1 && index === items.length - 1 && (
                        <AiOutlineMinusCircle
                            size="20px"
                            className="dark:text-white text-black"
                            style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", cursor: "pointer" }}
                            onClick={() => onDelete(index)}
                        />
                    )}
                </div>
            ))
        }
        <AiOutlinePlusCircle
            size="30px"
            className="dark:text-white text-black"
            style={{ margin: "10px 0px", cursor: "pointer" }}
            onClick={onAdd}
        />
    </div>
);

export default InputSection;
