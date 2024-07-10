
import { styles } from '@/app/styles/styles';
import React, { FC } from 'react'
import { AiOutlinePlusCircle } from "react-icons/ai";

type Props = {
    title: string;
    items: { title: string }[];
    onChange: (e: React.ChangeEvent<HTMLInputElement>, index: number) => void;
    onAdd: () => void;
    placeholder: string;
}

const InputSection: FC<Props> = ({ title, items, onChange, onAdd, placeholder }) => (
    <div>
        <label className={`${styles.label} text=[20px]`} htmlFor={title}>
            {title}
        </label>
        {
            items.map((item, index) => (
                <input
                    type="text"
                    key={index}
                    name={title}
                    placeholder={placeholder}
                    className={`${styles.input} my-2`}
                    required
                    value={item.title}
                    onChange={(e) => onChange(e, index)}
                />
            ))
        }
        <AiOutlinePlusCircle
            size="30px"
            style={{ margin: "10px 0px", cursor: "pointer" }}
            onClick={onAdd}
        />
    </div>
);

export default InputSection;
